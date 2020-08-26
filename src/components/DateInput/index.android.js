import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import * as RNLocalize from "react-native-localize";

import Icon from 'react-native-vector-icons/MaterialIcons';
const options = {
    year: 'numeric',
    month: ('long'),
    weekday: ( 'long'),
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeStyle: ('short' ),
    timeZone: RNLocalize.getTimeZone(),
}

import { Container, DateButton, DateText } from './styles'

export default function DateInput({ date, onChange }) {
     console.log('teim..............',options.timeZone);
    const dateFormatted = useMemo(() =>
        //format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })
        new Date(date).toLocaleDateString('pt-br', options)
    , [date]);

    console.log('DateFormatted.....', dateFormatted);

    async function handleOpenPicker(){
        // permite o usuario selecionar uma data no componente
        // DatePickerAndroid e obtem esses dados
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'spinner',
            date,
        });

        // se o usuario selecionou uma data no componente
        if(action === DatePickerAndroid.dateSetAction){
            // cria uma nova data com os valores de datas selecionados pelo user
            const selectdDate = new Date(year, month, day);

            onChange(selectdDate);
        }
    }

    return (
        <Container>
            <DateButton onPress={ handleOpenPicker }>
                <Icon name="event" color="#fff" size={ 20 } />
                <DateText>{ dateFormatted }</DateText>
            </DateButton>
        </Container>

    )
}