import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles'

export default function DateInput({ date, onChange }) {

    const dateFormatted = useMemo(() =>
        format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })
    , [date]);

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