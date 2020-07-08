import styled from "styled-components/native";

// componentes ja criados e estilizado na app, aqui serão customizados, para aproveitamento  e reuso
import Input from '~/components/Input';
import Button from '~/components/Button';

/** SafeAreaView - aplica margin-top apartir do statusBar (cabeçalho) */
export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(255,255,255,0.2);
    margin: 20px 0 30px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

// Form - transformado para scrowView, para que ao editar, o teclado fique por
// cima dos campos, showsVerticalScrollIndicator - não mostre a barra lateral do scroll
export const Form = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 }
})`
  align-self: stretch;

`;

// customizando o componente input ja criado
export const FormInput = styled(Input)`
    margin-top: 10px;
`;

// customizando o componente Button ja criado
export const SubmitButton = styled(Button)`
    margin-top: 10px;
`;