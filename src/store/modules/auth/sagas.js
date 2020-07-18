/** Esse file intercepta requisições assincronas, executa uma
 * determinada funcao e muda o state e o retorna ao store
 */
import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects'; // delay - opcao
//import { toast } from 'react-toastify';

//import history from '~/services/history'
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';


//  funcao signIn(login) generator function*  - obtem dados asyncrono, enviados pela action - @auth/SIGN_IN_REQUEST
export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        // call - pausa o Saga até a Promise (post) ser resolvida enviando os dados email , password
        const response = yield call(api.post, 'sessions', {
            email,
            password
        });

        // obtem os dados retornados
        const { token, user } = response.data;

        if (user.provider) {
            Alert.alert('Erro no login','O usuário não pode ser prestador de serviço');
            //toast.error('Usuário não é prestador de servico');
            return;
        }

        // adicionando token no header da app
        api.defaults.headers.Authorization = `Bearer ${token}`;

        //yield delay(3000);
        // Despacha as informações para redux action, atualiza estado o global e envia
        // as atualizações para os reducers, agora as informações podem ser consumidas pela store.
        yield put(signInSuccess(token, user));

        // navega para o dashboard
        //history.push('/dashboard');

    } catch (err) {
        Alert.alert('Falha na autenticação','Houve erro no login, verifique seus dados');

        //toast.error('Falha na autenticação, verifique seus dados');
        // remove o loading
        yield put(signFailure());

    }
}

export function* signUp({ payload }){
    try {
      const { name , email , password } = payload;

      yield call(api.post, 'users', {
          name,
          email,
          password,
          //provider: true,
      });

     // history.push('/');

    }catch (err){
        Alert.alert('Falha no cadastro, verifique seus dados!');

        yield put(signFailure());
    }
}

// Grava o token, no header (funcao normal (sem asterisco na declaracao) pois nao retorna dados asyncronos
// Se o usuario já estiver logado, nao será necessario enviar o token
// a api toda a vez que uma requisição for feita
export function setToken({ payload }){
   // se payload nao existe
   if(!payload) return;

   // se tiver obtem token
   const { token } = payload.auth;

   // se token existe no payload coloca no headers da app
   if(token){
         // adicionando token no header da app
         api.defaults.headers.Authorization = `Bearer ${token}`;
   }
}


// registra e observa, quando a action @auth/SIGN_IN_REQUEST for executada, chama
// a funcao signIn mo saga - takeLatest - apenas a função enviada no último click
// será executada/retornado o valor
export default all([
    takeLatest('persist/REHYDRATE', setToken), // permite enviar o token toda vez que a api for requisitada
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),

]);
