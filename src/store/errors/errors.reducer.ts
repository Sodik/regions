import { TAction } from 'store/store.types';
import { AxiosError } from 'axios';

export type TErrorsState = { [key: string]: AxiosError | null };

export const errorRegExp = /(.*)_(REQUEST|ERROR)$/;

export default (state: TErrorsState = {}, action: TAction): TErrorsState => {
  const matches = errorRegExp.exec(action.type);
  if (matches) {
    const [, requestName, requestState] = matches;

    return {
      ...state,
      [requestName]: requestState !== 'ERROR' ? null : action.payload
    };
  }

  return state;
};
