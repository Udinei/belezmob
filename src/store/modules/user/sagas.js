import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
//import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        // desestruc data, para name, email e o restante do data coloca em rest
        const { name, email, avatar_id, ...rest } = payload.data;

        // Object.assign - uni dois objetos
        const profile = Object.assign(
            { name, email, avatar_id },
            rest.oldPassword ? rest : {},/** se oldpassword foi preenchido, o user quer alterar a senha, entao envia o restante dos dados de data, senao envia um objeto vazio */
        )

        // chama api para atualizar o profile
        const response = yield call(api.put, 'users', profile);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
        //toast.success('Perfil atualizado com sucesso!');

        yield put(updateProfileSuccess(response.data));

    } catch{
        Alert.alert('Falha na atualização', 'Houve um erro na atualização, verifique seus dados');
        //toast.success('Erro ao atualizar perfil, confira seus dados!');
        yield put(updateProfileFailure());
    }

}

export default all([
    takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
