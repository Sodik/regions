import { TAction } from '../store.types';
import {
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRY_SUCCESS,
  SET_ORDER,
  TGetCountriesSuccess,
  TGetCountrySuccess,
  TSetOrder
} from './countries.actions';

export enum EOrder {
  DESC = 'desc',
  ASC = 'asc'
}

export enum EOrderBy {
  NAME = 'name',
  POPULATION = 'population'
}

export type TCurrency = { code: string; name: string; symbol: string };
export type TLanguage = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};
export type TRegionalBloc = {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
};
export type TCountry = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: string | null;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: TCurrency[];
  languages: TLanguage[];
  translations: { [key: string]: string };
  flag: string;
  regionalBlocs: TRegionalBloc[];
};

const initialState: {
  order: EOrder;
  orderBy: EOrderBy;
  data: TCountry[];
} = {
  data: [],
  order: EOrder.ASC,
  orderBy: EOrderBy.NAME
};

export default (state = initialState, action: TAction) => {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        data: (action as TGetCountriesSuccess).payload
      };

    case GET_COUNTRY_SUCCESS: {
      const { payload } = action as TGetCountrySuccess;

      if (payload) {
        return {
          ...state,
          data: [...state.data, payload]
        };
      }

      return state;
    }

    case SET_ORDER:
      return {
        ...state,
        ...(action as TSetOrder).payload
      };

    default:
      return state;
  }
};
