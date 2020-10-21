import React, { useMemo, useEffect, useState } from 'react';

import { parseISO, formatDistance, getHours } from 'date-fns';
var formatRelative = require('date-fns/formatRelative')
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, Left, Info, Name, Time } from './styles';
//import { Container, Left, Avatar, Info, Name, Time } from './styles';

import * as RNLocalize from "react-native-localize";
const { utcToZonedTime, format } = require('date-fns-tz')
import formatInTimeZone from '~/services/formatInTimeZone';

import Avatar from "~/components/Avatar";

// data = destruc. de response
export default function Appointment({ onCancel, data }) {

    console.log('data.....', data);

    // memoriza quanto tempo falta para o atendimento
    const dateParse = useMemo(() => {
        const timeZone = RNLocalize.getTimeZone();

        const dateUTC = formatInTimeZone(parseISO(data.date), "yyyy-MM-dd kk:mm:ss");

        const horasAndMinutes = format(parseISO(dateUTC), 'HH:mm');

        //TODO: Bug do formatRelative que não caulcula a hora corretamente
        // calcula quanto tempo falta até o dia do atendimento
        let dataCustom = formatRelative(parseISO(data.date), new Date(), {
            locale: pt,
            addSuffix: true,
        });

        // obtem somente uma das palavras da data ex: hoje, amanhã, domingo etc..
        dataCustom = dataCustom.split('').reverse().join('').slice(5).split('').reverse().join('');

        // concatena com o horario correto, o formatRelative não esta processando corretamente
        return dataCustom.concat(" " + horasAndMinutes.slice(0, 5) + "h");

    }, [data.date]);


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
        <Container past={ data.past } canceled={ data.canceled_at }>
            <Left>
                {/** <Avatar
                    source={ {
                        uri: data.provider.avatar
                            ? data.provider.avatar.url
                            : `https://api.adorable.io/avatars/50/${data.provider.name}.png`
                    } }
                />
                <Info>
                    <Name>{ data.provider.name }</Name>
                    <Time>{ dateParse }</Time>
                </Info>**/}
                <Avatar
                    img={

                        data.contact && data.contact.hasThumbnail
                            ? { uri: data.contact.thumbnailPath }
                            : undefined
                    }
                    placeholder={
                        data.contact && data.contact.givenName && data.contact.familyName
                            ?
                            getAvatarInitials(
                                `${data.contact.givenName} ${data.contact.familyName}`
                            )
                            : undefined
                    }

                    width={ 40 }
                    height={ 40 }
                />
                <Name>
                    {
                        data.contact && data.contact.givenName
                            ? data.contact.givenName
                            : undefined
                    }
                </Name>
                <Time>{ dateParse }</Time>

            </Left>

            {
                /** exibe o icone de cancelamento somente se a data ainda nao passou */
                data.cancelable && !data.canceled_at && (
                    <TouchableOpacity onPress={ onCancel }>
                        <Icon name="event-busy" size={ 20 } color="#f64c75" />
                    </TouchableOpacity>
                )
            }
        </Container>
    );
}
