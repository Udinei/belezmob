/** centraliza todos os reducer da app */
import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';

export default combineReducers({
    auth,
    user,
});
