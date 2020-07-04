import { Platform } from 'react-native';
import styled  from 'styled-components/native';

// componentes ja criados e estilizado na app, aqui serão customizados, para aproveitamento  e reuso
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

// customizando o componente input ja criado
export const FormInput = styled(Input)`
    margin-top: 10px;
`;

// customizando o componente Button ja criado
export const SubmitButton = styled(Button)`
    margin-top: 10px;
`;

export const SignLink = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const SignLinkText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
