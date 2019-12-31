import { combineReducers, AnyAction } from 'redux';
import countries from '../store/countries/countries.reducer';
import errors from '../store/errors/errors.reducer';
import loading from '../store/loading/loading.reducer';

const appReducer = combineReducers({
  countries,
  errors,
  loading
});

export type TStore = ReturnType<typeof appReducer>;

export default (state: any, action = {}) => appReducer(state, action as AnyAction);
