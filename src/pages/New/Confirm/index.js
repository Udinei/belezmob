import React, { useState, useEffect, useMemo } from 'react';
import { formatRelative, parseISO, getHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { utcToZonedTime, zonedTimeToUtc, format, toDate } from 'date-fns-tz';
import * as RNLocalize from "react-native-localize";

import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';

//import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import { Container, Name, Time, SubmitButton } from './styles';
import Avatar from "~/components/Avatar";



export default function Confirm({ navigation }) {
    const timeZone = RNLocalize.getTimeZone();
    //const provider = navigation.getParam('provider');
    const contact = navigation.getParam('contact');
    const time = navigation.getParam('time');

    const arrayDate = time.split("T")[1];
    const horasAndMinutes = arrayDate.split("+")[0];

    const dateFormatted = useMemo(
        () => format(parseISO(time), "'Dia' dd 'de' MMMM', às ", { locale: pt }).concat(horasAndMinutes.slice(0, 5)),
        [time]
    );

    // formata horario a ser salvo com timezone(horario) do dispositivo
    const dateSave = useMemo(
        () => {
            return time.slice(0, 19);
        },
        [time]
    );

    async function handleAddAppointment() {

        const dateUtc = zonedTimeToUtc(dateSave, timeZone);

        await api.post('appoitments', {
            contact_id: contact.recordID,
            date: dateUtc,

        }).catch((error) => {
            console.log('ouve um erro')
            // se a data/horario desejada do agendamento ja passou exibe msg
            Alert.alert('Erro', error.response.data.error);

        });

        navigation.navigate('Dashboard');
    }


    const getAvatarInitials = textString => {
        if (!textString) return "";

        const text = textString.trim();

        const textSplit = text.split(" ");

        if (textSplit.length <= 1) return text.charAt(0);

        const initials =
            textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

        return initials;
    };
    return (
        <Background>
            <Container>
                {/**  <Avatar
                    source={ {
                        uri: provider.avatar
                            ? provider.avatar.url
                            : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                    } }
                />
                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>
                **/}
                <Avatar
                    img={
                        contact.hasThumbnail
                            ? { uri: contact.thumbnailPath }
                            : undefined
                    }
                    placeholder={ getAvatarInitials(
                        `${contact.givenName} ${contact.familyName}`
                    ) }
                    width={ 40 }
                    height={ 40 }
                />
                 <Name>{contact.givenName}</Name>
                <Time>{dateFormatted}</Time>

                <SubmitButton onPress={ handleAddAppointment }>
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