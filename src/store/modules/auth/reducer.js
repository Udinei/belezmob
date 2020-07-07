/** Essa funcao fica ouvindo a chamada das actions, e retorna o estado alterado de acordo a alteração da action */
// estado inicial
import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false,

};

export default function auth(state = INITIAL_STATE, action) {

    return produce(state, draft => {
        switch (action.type) {
            // toda vez que a action @auth/SIGN_IN_SUCCESS for disparada
            case '@auth/SIGN_IN_REQUEST': {
                // produce retorna os dados do rascunho para o state,
                // vindos da action
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_SUCCESS': {
                draft.token = action.payload.token;
                draft.signed = true;
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.token = null;
                draft.signed = false;
                break;
            }
            default:
        }
    });
    }
