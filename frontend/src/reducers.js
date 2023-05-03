import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './ducks/auth.js';
import usersGetReducer from './ducks/usersGet.js'
import usersPostReducer from './ducks/usersPost.js'
import usersUpdateReducer from './ducks/usersUpdate.js';
import usersDeleteReducer from './ducks/usersDelete.js'
import popupInteractionUserReducer from './ducks/popupInteractionUser.js';


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  usersGet: usersGetReducer,
  usersPost: usersPostReducer,
  usersUpdate: usersUpdateReducer,
  usersDelete: usersDeleteReducer,
  popupInteractionUser: popupInteractionUserReducer,
});

export default rootReducer;
