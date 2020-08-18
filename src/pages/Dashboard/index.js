import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';
import timeZoneMob from '~/services/timezonemob';
import formatInTimeZone from '~/services/formatInTimeZone';
import * as RNLocalize from "react-native-localize";
const { utcToZonedTime, zonedTimeToUtc, format } = require('date-fns-tz')

import { isBefore, parseISO, subHours } from 'date-fns';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';

    /**
     * Essa funcao
     *  timeZone = 'America/Cuiaba'
     *  entrada: 2020-08-17T21:00:00.000Z
     *  saida: 2020-08-17 17:00:00 -04:00
     *  timeZone = "UTC"
     *   entrada: 2020-08-17T21:00:00.000Z
     *   saida: 2020-08-17 21:00:00 +00:00
     * @param {*} date - data - ex: parseISO(agenda.date)
     * @param {*} fmt - formato - "yyyy-MM-dd kk:mm:ss xxx"
     * @param {*} tz - timeZone- obtido com RNLocalize  ex: const timeZone = RNLocalize.getTimeZone() ou "UTC"
     * ex de uso: formatInTimeZone(parseISO(agenda.date), "yyyy-MM-dd kk:mm:ss xxx", timeZone)
     */
    /*const formatInTimeZone = (date, fmt, tz) =>
        format(utcToZonedTime(date, tz),
            fmt,
            { timeZone: tz });
     */

function Dashboard({ isFocused }) {


    // obtem a data e horario atual do dispositivo
    const hoje = timeZoneMob;
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
            //const dateTimeZone = formatInTimeZone(parseISO(agenda.date), "yyyy-MM-dd kk:mm:ss xxx", timeZone);
           // const hojeTimeZone = formatInTimeZone(parseISO(new Date(hoje)), "yyyy-MM-dd kk:mm:ss xxx", timeZone);
           // console.log("1.........", dateTimeZone);
           // console.log("2.........", dateTimeZone.split(' ')[0]+"T"+dateTimeZone.split(' ')[1]+".000Z");
            const newDateAgendaTimeZone = dateTimeZone.split(' ')[0]+"T"+dateTimeZone.split(' ')[1]+".000Z";

            // sincroniza atributo past (se os horarios ja passaram conforme timeZone)
            agenda.past = isBefore(parseISO(newDateAgendaTimeZone), new Date(hoje));
            //agenda.past = isBefore(dateTimeZone, hojeTimeZone);

            // exibe icone de cancelamento, agendamentos só podem ser canceladas somente duas horas antes do agendado
            agenda.cancelable = isBefore(new Date(hoje), subHours(parseISO(newDateAgendaTimeZone), 2))
            //agenda.cancelable = isBefore(hojeTimeZone, subHours(dateTimeZone), 2);
            return agenda;
        });

        setAppointments(newData);// atribui dadoas retornando por response a var. appointments
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
