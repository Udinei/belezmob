import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import './config/ReactrotonConfig';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

console.tron.log('Wello World');

export default function App() {
    return (
        <View style={ styles.container }>
            <Text style={ styles.welcome }>Hello World </Text>
        </View>
    );
}
