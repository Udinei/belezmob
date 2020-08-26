import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';
import dateTimeZoneMob from '~/services/dateTimeZoneMob';
import formatInTimeZone from '~/services/formatInTimeZone';
import * as RNLocalize from "react-native-localize";
const { utcToZonedTime, zonedTimeToUtc, format } = require('date-fns-tz')

import { isBefore, parseISO, subHours } from 'date-fns';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
/** Essa funcao exibe os agendamentos do usuario logado */
import { Container, Title, List } from './styles';


function Dashboard({ isFocused }) {

    // Obtem a data e horario atual o dispositivo
    const hoje = dateTimeZoneMob;
    const timeZone = RNLocalize.getTimeZone();

    // appointments, var. manipulada pelo metodo setAppointments
    const [appointments, setAppointments] = useState([]);

    async function loadAppointments() {
        // obtem os agendamentos
        const response = await api.get('appoitments');

        const agendamentos = response.data;

        // corrige horarios conforme timeZone e se ainda podem ser cancelados
        const newData = agendamentos.map(agenda => {
            const dateTimeZone = formatInTimeZone(parseISO(agenda.date), "yyyy-MM-dd kk:mm:ss xxx", timeZone);

            const newDateAgendaTimeZone = dateTimeZone.split(' ')[0]+"T"+dateTimeZone.split(' ')[1]+".000Z";

            // sincroniza atributo past (se os horarios ja passaram conforme timeZone)
            agenda.past = isBefore(parseISO(newDateAgendaTimeZone), new Date(hoje));

            // exibe icone de cancelamento, agendamentos só podem ser canceladas somente duas horas antes do agendado
            agenda.cancelable = isBefore(new Date(hoje), subHours(parseISO(newDateAgendaTimeZone), 2))

            agenda.date = newDateAgendaTimeZone;

            return agenda;
        });


        setAppointments(newData);// atribui dadoas retornando por response a var. appointments
        //setAppointments(response.data);// atribui dadoas retornando por response a var. appointments
    }

    // se a tela recebeu o foco
    useEffect(() => {
        if (isFocused) {
            // carrega os agendamentos
            loadAppointments();
        }

    }, [isFocused]);

    async function handleCancel(id) {
        const response = await api.delete(`appoitments/${id}`);

        setAppointments(
            appointments.map(appointment =>
                appointment.id === id
                    ? {
                        ...appointment, // retorna todos os appointment
                        canceled_at: response.data.canceled_at, // porem o appointment que tem o id, seta a data como cancelada
                    }
                    : appointment
            )
        );
    }


    return <Background>
        <Container>
            <Title>Agendamentos</Title>
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
