/** Essa funcao ouve chamadas das actions na app, e retorna o
 * estado alterado de acordo a alteração da action no estado inicial*/
import produce from 'immer';

const INITIAL_STATE = {
    profile: null,

};

export default function user(state = INITIAL_STATE, action) {
    //produce retorna os dados do rascunho e state, vindos da action para o store
    return produce(state, draft => {
        switch (action.type) {
            // toda vez que a action @auth/SIGN_IN_SUCCESS for disparada
            case '@auth/SIGN_IN_SUCCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@user/UPDATE_PROFILE_SUCCESS': {
                draft.profile = action.payload.profile;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.profile = null;
                break;
            }
            default:
                //return state;
        }
    });
}
