import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, getMinutes, getHours,isAfter, parseISO } from 'date-fns';
import api from '~/services/api';
import formatInTimeZone from '~/services/formatInTimeZone';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';
import dateTimeZoneMob from '~/services/dateTimeZoneMob';
import * as RNLocalize from "react-native-localize";

const options = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
    timeZone: RNLocalize.getTimeZone(), // obtem o timezone do dispositivo mob.
};

export default function SelectDateTime({ navigation }) {
    // Obtem timeZone do dispositivo ex: 'America/Cuiaba'
    // vai ser enviado como parametro para o backend calcular datas e tempo
    const timeZone = RNLocalize.getTimeZone();
    let tzDate = new Date().toLocaleDateString("pt-BR", options);
    console.log('.111................',tzDate);

    // data de hoje com timeZone do dispoitivo
    const hoje = dateTimeZoneMob;
    const dateTimeZone = formatInTimeZone(new Date(), "yyyy-MM-dd'T'kk:mm:ssxxx", timeZone);
    console.log('TimeZone ......', timeZone);
    console.log('dateTimeZone........', dateTimeZone);
    console.log('hoje........', hoje);
    console.log('hoje0........', new Date(hoje));
    console.log('hoje1........', new Date('2020-08-27'));
    const datatmp = new Date('2020-08-27T01:30:32.000Z');
    // staste inicia com a data de hoje
    const [date, setDate] = useState(new Date(dateTimeZone));
    const [hours, setHours] = useState([]);

    // obtendo o provider da navegação
    const provider = navigation.getParam('provider');

    useEffect(() => {
        async function loadAvaiable() {

            // retorna todos dos horarios de hoje disponiveis do provedor.id informado
            const response = await api.get(`providers/${provider.id}/available`, {
                params: {
                    date: date.getTime(), //retorna o formato em timestamp
                    timeZoneFront: timeZone,
                }
            });


            // corrige horarios conforme timeZone e se ainda podem ser cancelados
            console.log('Em selectDateTime/MOB 11111....................');
            const { data } = response;
            const appointments = [...data].pop(); // obtem o ultimo item que e appointments
            data.pop(); // remove a lista de appointments de data

            console.log('......',appointments.appointments);
            console.log('hoje...................',hoje);
            console.log('new date...................', new Date(hoje, timeZone));


            const avaiableNew = data.map(time => {
                console.log('time...................', time.time);
                //console.log('value...................', time.value);
                console.log('time value...................', time.value);
                console.log('dateTimezone...................', dateTimeZone);
                console.log('avaible......',isAfter(parseISO(time.value), parseISO(dateTimeZone)));

                return {
                    time: time.time,
                    value: time.value,
                    avaiable:
                        isAfter(parseISO(time.value), parseISO(dateTimeZone)) &&  // se a data data agendada ja passou de hoje retorna false
                        !appointments.appointments.find(a => {

                            let dateAppointment = formatInTimeZone(a.date, "yyyy-MM-dd'T'kk:mm:ssxxx", timeZone);
                            console.log('parseISO(a.date)...........', parseISO(a.date))
                            console.log('a.date..............', a.date);
                            console.log('dateAppointment..............', dateAppointment.split('T')[1].slice(0,5));
                            console.log('dateAppoinmtm com parse..............',parseISO(dateAppointment));
                            console.log('time.time..............', time.time);
                            //return format(parseISO(a.date), 'HH:mm') === time.time}),
                            let tmp = dateAppointment.split('T')[1].slice(0,5);
                            return  tmp === time.time}),
                    // se encontrar um agendamento para o horario(time) retorna false
                };

            })

            console.log('avaiable.......',avaiableNew);
            setHours(avaiableNew);

        }
        // chama a funcao
        loadAvaiable();

    }, [date, provider.id]);

    // carrega tela de confirmação de horario com o prestador
    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        });
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