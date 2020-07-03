import LinearGradient from 'react-native-linear-gradient'; // permite usar gradiente nas telas
import styled from 'styled-components/native'; // permite usar CSS para estilizar componentes React.

export default styled(LinearGradient).attrs({
    colors: ['#7159c1', '#ab59c1' ], // attrs - permite configurar oa atributos de LinearGradientes e outros componentes
})`
    flex: 1;
`;
