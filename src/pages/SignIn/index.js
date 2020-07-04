import React, { useRef } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
    Container, Form,
    FormInput,
    SubmitButton, SignLink,
    SignLinkText
} from './styles';

export default function SignIn({ navigation }) {
    // usando ref para melhorar a experiencia do usuario
    // para mudar o focus de um input para outro ao clicar em next do teclado
    // exibido pela properties returnKeyType="next" e controlado por onSubmitEditing
    const passwordRef = useRef();

    function handleSubmit(){

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
                    />
                   <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={ handleSubmit }>Acessar</SubmitButton>
                </Form>

                <SignLink onPress={ () => navigation.navigate('SignUp') }>
                    <SignLinkText>Criar conta gratuita</SignLinkText>
                </SignLink>

            </Container>
        </Background>
    )
}