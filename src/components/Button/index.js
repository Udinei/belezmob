import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

// ...rest - contem todo o restante das propriedades
export default function Button({ children, loading, ...rest }) {
    return (
        /** se loading exibe o indicator, senao exibe o text */
        <Container { ...rest }>
            { loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                    <Text>{ children }</Text>
                ) }

        </Container>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

Button.defaultProps = {
    loading: false
}
