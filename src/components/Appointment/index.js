import React, { useMemo } from 'react';
import { parseISO, formatDistance, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {

    // memoriaza quanto tempo falta para o atendimento
    const dateParse = useMemo(() => {
        // calcula quanto tempo falta de hoje até o dia do atendimento
        return formatRelative(parseISO(data.date), new Date(), {
            locale: pt,
            addSuffix: true,
        });
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
