﻿import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, getMinutes, getHours } from 'date-fns';
import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';
import timeZoneMob from '~/services/timezonemob';

export default function SelectDateTime({ navigation }) {
    //obtem timeZone do dispositivo ex: 'America/Cuiaba'
    const hoje = timeZoneMob;

    // inicia com a data de hoje
    const [date, setDate] = useState(new Date(hoje));
    const [hours, setHours] = useState([]);

    // obtendo o provider da navegação
    const provider = navigation.getParam('provider');

    useEffect(() => {
        async function loadAvaiable() {

            // retorna todos dos horarios de hoje disponiveis do provedor.id informado
            const response = await api.get(`providers/${provider.id}/available`, {
                params: {
                    date: date.getTime(), //retorna o formato em timestamp
                }
            });

            setHours(response.data);

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