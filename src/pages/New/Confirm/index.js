import React, { useState, useEffect, useMemo } from 'react';
import { formatRelative, parseISO, getHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { utcToZonedTime, zonedTimeToUtc, format, toDate } from 'date-fns-tz';
import * as RNLocalize from "react-native-localize";

import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';


export default function Confirm({ navigation }) {
    const timeZone = RNLocalize.getTimeZone();
    const provider = navigation.getParam('provider');
    const time = navigation.getParam('time');

    const arrayDate = time.split("T")[1];
    const horasAndMinutes = arrayDate.split("+")[0];

    const dateFormatted = useMemo(
        () => format(parseISO(time),"'Dia' dd 'de' MMMM', às ", { locale: pt }).concat(horasAndMinutes.slice(0,5)),
        [time]
    );

    // formata horario a ser salvo com timezone(horario) do dispositivo
    const dateSave = useMemo(
        () => {
                return time.slice(0,19);
              },
        [time]
    );

    async function handleAddAppointment(){
          console.log('time......................', time);
          console.log('date do front a Savar......', dateSave);
          console.log('utcToZonedTime......', utcToZonedTime(new Date(), 'UTC'));
          console.log('zonedTimeToUtc.......', zonedTimeToUtc(dateSave,timeZone));
          const dateUtc = zonedTimeToUtc(dateSave, timeZone);
          await api.post('appoitments', {
              provider_id: provider.id,
              date: time,
          });

          navigation.navigate('Dashboard');
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={ {
                        uri: provider.avatar
                            ? provider.avatar.url
                            : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                    } }
                />
                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>

                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar agendamento
                </SubmitButton>
            </Container>
        </Background>
    )
}

Confirm.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar agendamento',
    headerLeft: () => (
        <TouchableOpacity onPress={ () => navigation.goBack() }>
            <Icon name="arrow-back" size={ 24 } color="#fff" />
        </TouchableOpacity>
    ),
});