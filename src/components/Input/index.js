import React, { forwardRef } from 'react'; // forwardRef - permite manipular o objeto por referencia
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, icon, ...rest }, ref){
  return (
      <Container style={style}>
          {icon && <Icon name={icon} size={20}
          color="rgba(255,255, 255, 0.8)" />}
          <TInput {...rest} ref={ref} />
      </Container>
  );
}

Input.propTypes = {
    // icon - é uma string
    icon: PropTypes.string,
    // style -  pode ser um objeto ou um array de objeto
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
    // style inicia com sendo um objeto vazio
    icon: null,
    style: {},
};

// abilitando o componente a ser usado por referencia
export default forwardRef(Input);