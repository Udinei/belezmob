import LinearGradient from 'react-native-linear-gradient'; // permite usar gradiente nas telas
import styled from 'styled-components/native'; // permite usar CSS para estilizar componentes React.

export default styled(LinearGradient).attrs({
    colors: ['#ffffff', '#ffffff' ], // attrs - permite configurar oa atributos de LinearGradientes e outros componentes
})`
    flex: 1;
`;