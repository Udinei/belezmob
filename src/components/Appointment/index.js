import React, { useMemo } from 'react';
import { parseISO, formatDistance, formatRelative, getHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {

    // memoriaza quanto tempo falta para o atendimento
    const dateParse = useMemo(() => {
        //console.log('data.past.....', data.past);

        const arrayDate = data.date.split("T")[1];
        const horasAndMinutes = arrayDate.split("+")[0];

        // calcula quanto tempo falta de react.gradle até o dia do atendimento
        let dataCustom = formatRelative(parseISO(data.date), new Date(), {
            locale: pt,
            addSuffix: true,
        });

        dataCustom = dataCustom.split('').reverse().join('').slice(5).split('').reverse().join('');
        return dataCustom.concat(horasAndMinutes.slice(0,5));

    }, [data.date]);

    return (
        <Container past={ data.past }>
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
                <TouchableOpacity onPress={onCancel}>
                    <Icon name="event-busy" size={ 20 } color="#f64c75" />
                </TouchableOpacity>
              )
             }
        </Container>
    );
}
