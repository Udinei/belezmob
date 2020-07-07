import React, { useRef, useState } from 'react';
import { Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'; // hocks

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
    Container, Form,
    FormInput,
    SubmitButton, SignLink,
    SignLinkText
} from './styles';

export default function SignIn({ navigation }) {

    // inicializando redux
    const dispatch = useDispatch();

    // usando ref para melhorar a experiencia do usuario
    // para mudar o focus de um input para outro ao clicar em next do teclado
    // exibido pela properties returnKeyType="next" e controlado por onSubmitEditing
    const passwordRef = useRef();
    // os valores de email e password, sao inseridos setEmail e setPassword
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // acessando via redux o reducer de autenticação auth
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit(){
          // diparando action, passando o email e password que vem do state
           dispatch(signInRequest(email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={ false }
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />
                   <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={ handleSubmit }>Acessar</SubmitButton>
                </Form>

                <SignLink onPress={ () => navigation.navigate('SignUp') }>
                    <SignLinkText>Criar conta gratuita</SignLinkText>
                </SignLink>

            </Container>
        </Background>
    )
}