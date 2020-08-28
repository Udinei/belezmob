import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { isAfter, parseISO, format } from 'date-fns';
import api from '~/services/api';
import formatInTimeZone from '~/services/formatInTimeZone';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';
//import dateTimeZoneMob from '~/services/dateTimeZoneMob';
import * as RNLocalize from "react-native-localize";

const options = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
    timeZone: RNLocalize.getTimeZone(), // obtem o timezone do dispositivo mob.
};

export default function SelectDateTime({ navigation }) {

    // acessa o estado do redux e obtem os dados do profile que foram gravados
    // lá durante o login
    const user = useSelector(state => state.user.profile);

    // Obtem timeZone do dispositivo ex: 'America/Cuiaba'
    // sera usada no calculo das datas e horarios
    const timeZone = RNLocalize.getTimeZone();

    // data de hoje com timeZone do dispoitivo
    // const hoje = dateTimeZoneMob;
    const dateTimeZone = formatInTimeZone(new Date(), "yyyy-MM-dd'T'kk:mm:ssxxx", timeZone);

    /** verifica se o formato da horas é igual 24 horas */
    let horas24 = false;
    if (parseInt(dateTimeZone.split('T')[1].slice(0, 2)) === 24) {
        horas24 = true;
    }

    /** inicia state com a data de hoje, se já são 24horas, new Date
     * retornara 00 horas, sem informar diferenca de horario do timeZone.*/
    const [date, setDate] = useState(horas24 ? new Date() : new Date(dateTimeZone));
    const [hours, setHours] = useState([]);
    const [appointmentsUser, setAppointmentsUser] = useState([]);

    // obtendo o provider da navegação
    const provider = navigation.getParam('provider');

    useEffect(() => {
        async function loadAvaiable() {

            // retorna todos dos horarios do provedor.id informado disponiveis hoje
            const response = await api.get(`providers/${provider.id}/available`, {
                params: {
                    date: date.getTime(), //retorna o formato em timestamp
                }
            });


            const { data } = response;

            // obtem a lista de agendamentos do provedor o ultimo item
            const appointments = [...data].pop();
            console.log('Appointments.11...................', appointments);

            //  remove a lista de appointments, ficando em data somente os horarios
            data.pop();
            console.log('Appointments.data...................', data);

            //  retorna horarios disponiveis do provedor
            const avaiableNew = data.map(time => {
                return {
                    time: time.time,
                    value: time.value,
                    avaiable:
                        // se encontrar um agendamento para o horario(time) retorna false
                        isAfter(parseISO(time.value), parseISO(dateTimeZone)) &&  // se a data data agendada ja passou de hoje retorna false
                        !appointments.appointments.find(a => {
                            let dateAppointment = formatInTimeZone(a.date, "yyyy-MM-dd'T'kk:mm:ssxxx", timeZone);
                            let tmp = dateAppointment.split('T')[1].slice(0, 5);
                            return (tmp === time.time)
                        }),
                };
            })

            // exibe os horarios disponiveis na data
            setHours(avaiableNew);
        }

        // chama a funcao
        loadAvaiable();

    }, [date, provider.id]);


    // carrega tela de confirmação de horario com o prestador
    async function handleSelectHour(time) {

        // retorna todos dos horarios de data selecionada já agendados para o user logado
        const response = await api.get(`users/${user.id}/available`, {
            params: {
                date: date.getTime(), //retorna o formato em timestamp
            }
        });

        // obtem a lista de agendamentos do user
        const appointmentsUser = response.data;

        // se encontrar retorna o agendamento do user para o horario selecionado
        // e undefined caso contrario
        const hasAppointments = appointmentsUser.find(a => {
            let dateAppointment = formatInTimeZone(a.date, "yyyy-MM-dd'T'kk:mm:ssxxx", timeZone);
            let hoursTZ = dateAppointment.split('T')[1].slice(0, 5); // horario com timeZone

            return (hoursTZ === time.split('T')[1].slice(0, 5));
        })

        // se o user ja tiver algum agendamento no horario selecionado
        if (hasAppointments) {
            Alert.alert(
                'Horário já agendado!',
                `Você já agendou esse horário com ${hasAppointments.provider.name}.\n
                 Click em 'OK' se deseja agendar também esse horário com ${provider.name}?`,
                [
                    {
                        text: 'Cancel',
                        onPress: () => { return },
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Confirm', { provider, time })
                    }
                ],
                { cancelable: false }
            );

        } else {

            navigation.navigate('Confirm', {
                provider,
                time,
            });
        }
    }


    return (
        <Background>
            <Container>
                <DateInput date={ date } onChange={ setDate } />
                <HourList
                    data={ hours }
                    keyExtractor={ item => item.time }
                    renderItem={ ({ item }) => (
                        <Hour onPress={ () => handleSelectHour(item.value) } enabled={ item.avaiable }>
                            <Title>{ item.time }</Title>

                        </Hour>
                    ) }
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horário',
    headerLeft: () => (
        <TouchableOpacity onPress={ () => navigation.goBack() }>
            <Icon name="arrow-back" size={ 24 } color="#fff" />
        </TouchableOpacity>
    ),
});