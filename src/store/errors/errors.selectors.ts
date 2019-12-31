import { TStore } from '../../redux/rootReducer';

export const createErrorSelector = (actions: string[]) => (state: TStore) => {
  return actions.some(action => state.errors[action]);
};
