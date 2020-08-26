﻿import React, { useMemo } from 'react';
import { parseISO, formatDistance, getHours } from 'date-fns';
var formatRelative = require('date-fns/formatRelative')
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Left, Avatar, Info, Name, Time } from './styles';
import * as RNLocalize from "react-native-localize";
const { utcToZonedTime, format } = require('date-fns-tz')
import formatInTimeZone from '~/services/formatInTimeZone';


export default function Appointment({ data, onCancel }) {

    // memoriza quanto tempo falta para o atendimento
    const dateParse = useMemo(() => {
        const timeZone = RNLocalize.getTimeZone();

        const dateUTC = formatInTimeZone(parseISO(data.date), "yyyy-MM-dd kk:mm:ss xxx", 'UTC');

       const horasAndMinutes = format(parseISO(dateUTC),'HH:mm');

        // calcula quanto tempo falta até o dia do atendimento
        //TODO: Bug formatRelative não caulcula a hora corretamente
        let dataCustom = formatRelative(parseISO(data.date), new Date(), {
            locale: pt,
            addSuffix: true,

        });

         // obtem somente uma das palavras da data ex: hoje, amanhã, domingo etc..
         dataCustom = dataCustom.split('').reverse().join('').slice(5).split('').reverse().join('');

         // concatena com o horario correto, o formatRelative não esta processando corretamente
         return dataCustom.concat(" "+horasAndMinutes.slice(0, 5)+"h");

    }, [data.date]);

    return (
        <Container past={ data.past } canceled={data.canceled_at}>
            <Left>
                <Avatar
                    source={ {
                        uri: data.provider.avatar
                            ? data.provider.avatar.url
                            : `https://api.adorable.io/avatars/50/${data.provider.name}.png`
                    } }
                />
                <Info>
                    <Name>{ data.provider.name }</Name>
                    <Time>{ dateParse }</Time>
                </Info>
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
