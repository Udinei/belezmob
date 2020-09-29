import React, { useRef, useState, useEffect } from 'react'; // useEffect - executado toda vez que um variavel mudar de valor
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Contacts from 'react-native-contacts';
import {  PermissionsAndroid } from 'react-native';

import { Container, Title, Separator, Form, FormInput, SubmitButton, LogoutButton, ImportContatoButton } from './styles';
import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';

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
     // acessa o estado do redux e obtem os dados do profile que foram gravados
    // durante o login
    const user = useSelector(state => state.user.profile);

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

    function handleLogout(){
        dispatch(signOut());
    }

    function handleImportContatos(){
        requestReadContactsPermission();
    }

    async function requestReadContactsPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'App Premission',
                    'message': 'Chat x App need permission.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can read contacts")
                listContacts();

            } else {
                console.log("read contacts permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


  async function listContacts() {

        Contacts.checkPermission((err, permission) => {
            if (err) throw err;

            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            if (permission === 'undefined') {
                Contacts.requestPermission((err, permission) => {
                    // ...
                })
            }
            if (permission === 'authorized') {
                Contacts.getAll((err, contacts) => {
                    if (err) throw err;


                    // cria uma nova lista de contatos somente com os dados desejados, retorna undefined caso nao encontre nada
                    const contactsNew = contacts.map(contato => {
                        const phoneNumbers = contato.phoneNumbers.map(fone => fone)
                        // console.log('.....', phoneNumbers);
                        return {
                            displayName: contato.displayName,
                            phoneNumbers: phoneNumbers,
                        }
                    });

                    // cria a nova lista de contatos no banco e retorna seus dados
                    const listContactosCreated = (async () => {
                        const response = await api.post('/contatos',
                            {
                                contatos: contactsNew,
                                user_id: user.id
                            }
                        )
                        return response.data;
                    });

                    // recupera lista de contatos criado
                    listContactosCreated().then((data) => {
                        console.log('contatos salvo com sucesso.....', data)
                    }
                    );
                })

               /* const tmp = (async () => {
                    const tmp = await api.get('/contatos', {
                             params:{ user_id: 16}
                      })

                    //console.log('foi...', tmp.data);
                    return tmp.data;
                   });

                tmp().then((data)=>{
                    console.log('uraaa.....',data);
                });*/
            }
            if (permission === 'denied') {
                // x.x
            }


        })


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
                    <LogoutButton onPress={handleLogout}>Sair do Belez</LogoutButton>
                    <ImportContatoButton onPress={handleImportContatos}>Importar Contatos</ImportContatoButton>

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