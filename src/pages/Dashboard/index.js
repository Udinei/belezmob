import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';

import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

export default function Dashboard(){
    // appointments, var. manipulada pelo mento setAppointments
    const [appointments, setAppointments] = useState([]);


    // faz o papel do didmount
    useEffect(() => {
        async function loadAppointments(){
            // obtem os agendamentos
            const response = await api.get('appoitments');

            setAppointments(response.data);// atribui dadoas retornando por response a var. appointments
        }

         // executando a função
        loadAppointments();

    },[]);

    async function handleCancel(id){
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
              data={appointments}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <Appointment onCancel={() => handleCancel(item.id)}  data={item} />}
           />
      </Container>
  </Background>;
}

// criando tabs de navegação no roda-pe
Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="event" size={20} color={tintColor} />
    ),
}
