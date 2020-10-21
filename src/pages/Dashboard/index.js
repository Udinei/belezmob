/**
 * A data do agendamento vai ser recuperada e gravada no banco em UTC
 * Todo agendamento tera a sua data convertida para o UTC do dispositivo do cliente
 */

import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';
import dateTimeZoneMob from '~/services/dateTimeZoneMob';
import formatInTimeZone from '~/services/formatInTimeZone';
import * as RNLocalize from "react-native-localize";
const { utcToZonedTime, zonedTimeToUtc, format } = require('date-fns-tz')

import { isBefore, parseISO, subHours } from 'date-fns';
import { PermissionsAndroid } from 'react-native';

import Contacts from "react-native-contacts";

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
/** Essa funcao exibe os agendamentos do usuario logado */
import { Container, Title, List } from './styles';


function Dashboard({ isFocused }) {

    // Obtem a data e horario atual do dispositivo
    const hoje = dateTimeZoneMob;
    const timeZone = RNLocalize.getTimeZone();

    // appointments, var. manipulada pelo metodo setAppointments
    const [appointments, setAppointments] = useState([]);
    const [contatos, setContatos] = useState([]);

    // obtem todos os agendamentos do usuario (cliente) com seus contatos do dispositivo
    async function loadAppointments() {

        //const response = await api.get('appoitments');
        // obtendo os agendamentos
        const response = await api.get('/appoitments/contacts');

        // obtem o array dos dados do agendamento
        const agendamentos = response.data;

        // retorna um novo array de objetos com os dados dos agendamento validados para o UTC cliente
        const newData = await agendamentos.map(agenda => {

            // converte data do agendamento em UTC para timezone do dispositivo
            const dateTimeZone = formatInTimeZone(parseISO(agenda.date), "yyyy-MM-dd kk:mm:ss xxx", timeZone);

            const newDateAgendaTimeZone = dateTimeZone.split(' ')[0] + "T" + dateTimeZone.split(' ')[1] + ".000Z";

            // se encontrar o contato na agenda, e incluia na lista de contatos  agendados
            agenda.contact = contatos.find(contato => parseInt(contato.recordID) === agenda.contact_id)

            // seta past = true se o horario ja passou conforme timeZone do dispositivo
            agenda.past = isBefore(parseISO(newDateAgendaTimeZone), new Date(hoje));

            // cancelable = true que define se icone de cancelamento sera exibido, os agendamentos podem ser canceladas até duas horas antes do agendado
            agenda.cancelable = isBefore(new Date(hoje), subHours(parseISO(newDateAgendaTimeZone), 2))

            // corrige horarios conforme timeZone
            agenda.date = newDateAgendaTimeZone;

            // agendamento formatado para exibir da data no timezone do dispositivo
            // e qual contato agendado
            const newAgenda = {
                cancelable: agenda.cancelable,
                contact: agenda.contact,
                contact_id: agenda.contact_id,
                date: agenda.date,
                id: agenda.id,
                past: agenda.past,
            }

            return newAgenda;
        });

        //  console.log('Appointments_Dashboard.......'. newData)
        setAppointments(newData); // atualiza state de appointments
    }

    useEffect(() => {
        requestReadContactsPermission();

        // se a tela recebeu o foco
        if (isFocused) {

            // e lista de contatos ja carregada
            if (contatos.length > 0) {

                // carrega os agendamentos
                loadAppointments();
            }
        }

    }, [isFocused, JSON.stringify(contatos), JSON.stringify(appointments)]);


    // verifica se o usuario deu permissão de leitura dos contatos
    requestReadContactsPermission = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'App Premission',
                    'message': 'Chat x App need permission.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                console.log("You can read contacts")
                await loadContacts();

            } else {
                console.log("read contacts permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    // carrega lista de contatos do dispositivo
    async function loadContacts() {
        Contacts.getAll((err, contacts) => {
            if (err === "denied") {
                console.warn("Permission to access contacts was denied");
            }
            else {
                // coloca contatos no state
                setContatos(contacts);

                // carrega animação carregando
                //  setLoading(false);
            }
        });
    }

    // ao clicar no icone de cancelamento
    async function handleCancel(id) {

        // deleta agendamento selecionado
        const response = await api.delete(`appoitments/${id}`);

        // atualiza a lista de agendamentos, sinalizando a remoção do item cujo id foi informado
        setAppointments(
            appointments.map(appointment =>

                // se o agendamento tem o id informado
                appointment.id === id
                    ? {
                        ...appointment, // retorna um objeto com todos os appointment, menos o appointment que tem o id informado
                        canceled_at: response.data.canceled_at, // e seta a data sinalizando que o agendamento foi cancelado
                    }
                    : appointment
            )
        );
    }


    return <Background>
        <Container>
            <Title>Agendamentos</Title>
           { console.log('.............', appointments.length)}
            <List
                data={ appointments }
                keyExtractor={ item => String(item.id) }
                renderItem={ ({ item }) => <Appointment onCancel={ () => handleCancel(item.id) } data={ item } /> }
           />


        </Container>
    </Background>;
}

// criando tabs de navegação no roda-pe
Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="event" size={ 20 } color={ tintColor } />
    ),
}

export default withNavigationFocus(Dashboard);
