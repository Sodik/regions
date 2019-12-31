import { TAction } from 'store/store.types';

export type LoadingState = { [key: string]: boolean };

export const loadingTypeRegExp = /(.*)_(REQUEST|SUCCESS|ERROR)$/;

export default (state: LoadingState = {}, action: TAction) => {
  const matches = loadingTypeRegExp.exec(action.type);
  if (matches) {
    const [, requestName, requestState] = matches;

    return {
      ...state,
      [requestName]: requestState === 'REQUEST'
    };
  }

  return state;
};
