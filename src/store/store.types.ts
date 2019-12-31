export type TAction<T = any> = {
  type: string;
  payload?: T;
};
