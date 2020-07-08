﻿import React, { useRef, useState, useEffect } from 'react'; // useEffect - executado toda vez que um variavel mudar de valor
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Separator, Form, FormInput, SubmitButton } from './styles';
import Background from '~/components/Background';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
    const dispatch = useDispatch();
    // acessa o estado do redux e obtem os dados do profile que ja estao lá
    const profile = useSelector(state => state.user.profile);

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    // preenche os valores iniciais do nome e email, com o conteudo vindo do state do redux
    const [name, setName ] = useState(profile.name);
    const [email, setEmail ] = useState(profile.email);

    const [oldPassword, setOldPassword ] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');

    // toda vez que profile for alterado, a função useEffect sera executada
    // limpando os campos
    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit(){
        // passando um objeto com todos os dados do profile
        // os dados virao das variaveis preenchidas com dados do state
        dispatch(updateProfileRequest({
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        }));
    }

    return (
        <Background>
            <Container>
                <Title>Meu Perfil</Title>

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={ false }
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={ () => emailRef.current.focus() }
                        value={ name }
                        onChangeText={ setName }
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={ false }
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        ref={ emailRef }
                        returnKeyType="next"
                        onSubmitEditing={ () => oldPasswordRef.current.focus() }
                        value={ email }
                        onChangeText={ setEmail }
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha atual"
                        ref={ oldPasswordRef }
                        returnKeyType="next"
                        onSubmitEditing={ () => passwordRef.current.focus() }
                       value={ oldPassword }
                        onChangeText={ setOldPassword }
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua nova senha"
                        ref={ passwordRef }
                        returnKeyType="next"
                        onSubmitEditing={ () => confirmPasswordRef.current.focus() }
                        value={ password }
                        onChangeText={ setPassword }
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirmação de senha"
                        ref={ confirmPasswordRef }
                        returnKeyType="send"
                        onSubmitEditing={ handleSubmit }
                        value={ confirmPassword }
                        onChangeText={ setConfirmPassword }
                    />

                    <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
                </Form>
            </Container>
        </Background>
    )
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu Perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={ 20 } color={ tintColor } />
    ),
};