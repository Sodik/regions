import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import countriesSaga from '../store/countries/countries.saga';

export const sagaMiddleware = createSagaMiddleware();

const configureStore = (state = {}) => {
  const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

  return createStore(rootReducer, state, middleware);
};

export const store = configureStore({});

sagaMiddleware.run(countriesSaga);
