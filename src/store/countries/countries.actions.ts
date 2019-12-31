import { action } from '../store.utils';
import { AxiosError } from 'axios';
import { EOrder, EOrderBy, TCountry } from './countries.reducer';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_ERROR = 'GET_COUNTRIES_ERROR';

export const getCountries = (payload: string) => action(GET_COUNTRIES_REQUEST, payload);
export type TGetCountries = ReturnType<typeof getCountries>;
export const getCountriesSuccess = (payload: TCountry[]) => action(GET_COUNTRIES_SUCCESS, payload);
export type TGetCountriesSuccess = ReturnType<typeof getCountriesSuccess>;
export const getCountriesError = (payload: AxiosError) => action(GET_COUNTRIES_ERROR, payload);

export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_COUNTRY_REQUEST = 'GET_COUNTRY_REQUEST';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_ERROR = 'GET_COUNTRY_ERROR';

export const getCountry = (payload: string) => action(GET_COUNTRY_REQUEST, payload);
export type TGetCountry = ReturnType<typeof getCountry>;
export const getCountrySuccess = (payload: TCountry | null) => action(GET_COUNTRY_SUCCESS, payload);
export type TGetCountrySuccess = ReturnType<typeof getCountrySuccess>;
export const getCountryError = (payload: AxiosError) => action(GET_COUNTRY_ERROR, payload);

export const SET_ORDER = 'SET_ORDER';
export const setOrder = (payload: { order: EOrder; orderBy: EOrderBy }) =>
  action(SET_ORDER, payload);
export type TSetOrder = ReturnType<typeof setOrder>;
