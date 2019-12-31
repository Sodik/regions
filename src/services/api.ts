import axios from 'axios';

export const API = {
  GET_REGION_BY_NAME: (region: string) => `/region/${region}`,
  GET_COUNTRY_BY_NAME: (country: string) => `/name/${country}`
};

export const api = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2',
  headers: {
    'Content-Type': 'application/json'
  }
});
