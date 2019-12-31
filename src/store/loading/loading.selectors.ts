import { TStore } from '../../redux/rootReducer';

export const createLoadingSelector = (actions: string[]) => (state: TStore) => {
  return actions.some(action => action.indexOf('GET_') === 0 && state.loading[action]);
};

export const createProcessingSelector = (actions: string[]) => (state: TStore) => {
  return actions.some(action => action.indexOf('GET_') < 0 && state.loading[action]);
};
