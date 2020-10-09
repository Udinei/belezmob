import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ActivityIndicator,
    FlatList
} from "react-native";


import Contacts from "react-native-contacts";
import ListItem from "~/components/ListItem";
import Avatar from "~/components/Avatar";
import SearchBar from "~/components/SearchBar";

//import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import api from '~/services/api';
import Background from '~/components/Background';

//import { Container, ProvidersList, Provider, Avatar, Name } from './styles';
import { Container, ProvidersList, Provider, Name } from './styles';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState([]);

    const [contacts, setContacts] = useState([]);
    const [searchPlaceholder, setSearchPlaceholder] = useState('Search');
    const [typeText, setTypeText] = useState(null);
    const [loading, setLoading] = useState(true);

    const [prevState, setPrevState] = useState({});

    // acessa o estado do redux e obtem os dados do profile que foram gravados
    // durante o login
    const user = useSelector(state => state.user.profile);

    const getAvatarInitials = textString => {
        if (!textString) return "";

        const text = textString.trim();

        const textSplit = text.split(" ");

        if (textSplit.length <= 1) return text.charAt(0);

        const initials =
            textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

        return initials;
    };

    useEffect(() => {

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
                    loadContacts();

                } else {
                    console.log("read contacts permission denied")
                }
            } catch (err) {
                console.warn(err)
            }
        }


        async function loadProviders() {
            const response = await api.get('providers');
            //console.tron.log('providers carregando......', response.data);
            setProviders(response.data);
        }


        requestReadContactsPermission();
        //loadProviders();

    }, []);

    function loadContacts() {
        Contacts.getAll((err, contacts) => {
            if (err === "denied") {
                console.warn("Permission to access contacts was denied");
            } else {
                // console.log(".........", contacts);
                setContacts(contacts);
                setLoading(false);
            }
        });

        Contacts.getCount(count => {
            setSearchPlaceholder(`Search ${count} contacts`);
        });
    }

    function search(text) {
        console.log('search text......', text);
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (text === "" || text === null) {
            loadContacts();

        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
                setContacts(contacts);
            });
        } else if (emailAddressRegex.test(text)) {
            Contacts.getContactsByEmailAddress(text, (err, contacts) => {
                setContacts(contacts);
            });
        } else {
            Contacts.getContactsMatchingString(text, (err, contacts) => {
                setContacts(contacts);
            });
        }
    }

    async function onPressContact(contact) {
        console.log('onPressContact...', contact);

        Contacts.checkPermission((err, permission) => {
            if (err) throw err;

            if (permission === 'undefined') {
                Contacts.requestPermission((err, permission) => {
                    if (err) throw err;

                })
            }
            if (permission === 'authorized') {
                Contacts.getAll((err, contacts) => {
                    if (err) throw err;

                    // cria uma nova lista de contatos somente com os dados desejados, retorna undefined caso nao encontre nada
                    const contactsNew = contacts.map(contato => {

                        // obtem os numero de telefone do contato
                        const phoneNumbers = contato.phoneNumbers.map(fone => fone)
                        // console.log('.....', phoneNumbers);
                        return {
                            displayName: contato.displayName,
                            phoneNumbers: phoneNumbers,
                            recordID: contato.recordID,
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
                        console.log('testa.....', data)
                    }
                    )
                })

            } if (permission === 'denied') {
                console.log('permissao negada', permission)
            }
        })
    }

   const renderFooter = () => {
        if (loading) {
            return <ActivityIndicator size="large" />;
        } else {
            return null;
        }
    };

   const fetchMore = () => {
        if (loading) {
            return null;
        }
        setPrevState(
            (prevState) => {
                return { loading: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                this.sendAPIRequest(null, true);
            }
        );
    };

    return (
        <Background>
            <Container>
                <View
                    style={ {
                        paddingLeft: 100,
                        paddingRight: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 70,
                        backgroundColor: "#fff",
                    } }
                >
                    {/**    <Image
                    source={ require("~/assets/contacts.png") }
                    style={ {
                        aspectRatio: 6,
                        resizeMode: "contain"
                    } }
                />  */}
                </View>
                <SearchBar
                    searchPlaceholder={ searchPlaceholder }
                    onChangeText={ search }
                />
                {
                    loading === true ?
                        (
                            <View style={ styles.spinner }>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ) : (
                            <FlatList style={ {
                                flex: 1,
                                padding: 20,
                                backgroundColor: '#fff',
                                margin: 10
                            }
                            }
                                data={ contacts }
                                renderItem={ ({ item, index }) => {
                                   return (
                                    <ListItem
                                    leftElement={
                                        <Avatar
                                            img={
                                                item.hasThumbnail
                                                    ? { uri: item.thumbnailPath }
                                                    : undefined
                                            }
                                            placeholder={ getAvatarInitials(
                                                `${item.givenName} ${item.familyName}`
                                            ) }
                                            width={ 40 }
                                            height={ 40 }
                                        />
                                    }
                                    key={ item.recordID }
                                    title={ `${item.givenName} ${item.familyName}` }
                                    description={ `${item.company}` }
                                    onPress={ () => {
                                        onPressContact(item)
                                        navigation.navigate('SelectDateTime', { item, contacts })
                                    } }
                                />)
                                } }
                                keyExtractor={ (item, index) => item.recordID.toString() }
                                initialNumToRender={8}
                                maxToRenderPerBatch={2}
                                onEndReached={ fetchMore }
                                onEndReachedThreshold={ 0.1 }
                                ListFooterComponent={ renderFooter }
                                refreshing={ loading }
                            />
                            /**  <ScrollView style={ {
                                 flex: 1,
                                 padding: 20,
                                 backgroundColor: '#fff',
                                 margin: 10
                             }
                             }>
                                 {
                                     contacts.map(contact => {
                                         return (
                                             <ListItem
                                                 leftElement={
                                                     <Avatar
                                                         img={
                                                             contact.hasThumbnail
                                                                 ? { uri: contact.thumbnailPath }
                                                                 : undefined
                                                         }
                                                         placeholder={ getAvatarInitials(
                                                             `${contact.givenName} ${contact.familyName}`
                                                         ) }
                                                         width={ 40 }
                                                         height={ 40 }
                                                     />
                                                 }
                                                 key={ contact.recordID }
                                                 title={ `${contact.givenName} ${contact.familyName}` }
                                                 description={ `${contact.company}` }
                                                 onPress={ () => {
                                                     onPressContact(contact)
                                                     navigation.navigate('SelectDateTime', { contact, contacts })
                                                 } }
                                             />
                                         );
                                     })
                                 }
                             </ScrollView>*/

                        )
                }

            </Container>
        </Background>
    );

    {/** return (

        <Background>
            <Container>
                <ProvidersList
                    data={ providers }
                    keyExtractor={ provider => String(provider.id) }
                    renderItem={ ({ item: provider }) => (
                        <Provider
                            onPress={ () => {
                                navigation.navigate('SelectDateTime', { provider })
                            }
                            }
                        >
                            <Avatar
                                source={ {
                                    uri: provider.avatar
                                        ? provider.avatar.url
                                        : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                                } }
                            />

                            <Name>{ provider.name }</Name>
                        </Provider>
                    ) }
                />
            </Container>
      </Background>);**/}

}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        flexDirection: 'column',
        alignContent: "center",
        justifyContent: "center"
    },
    inputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: "center"
    }
});


SelectProvider.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o prestador',
    headerLeft: () => (
        <TouchableOpacity onPress={ () => navigation.navigate('Dashboard') }>
            <Icon name="arrow-back" size={ 24 } color="#000" />
        </TouchableOpacity>
    ),
});