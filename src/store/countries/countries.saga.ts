import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_COUNTRIES_REQUEST,
  TGetCountries,
  getCountriesSuccess,
  getCountriesError,
  TGetCountry,
  getCountrySuccess,
  getCountryError,
  GET_COUNTRY_REQUEST
} from './countries.actions';
import { API, api } from '../../services/api';

function* getRegionCountriesSaga({ payload }: TGetCountries) {
  try {
    const response = yield call(api.get, API.GET_REGION_BY_NAME(payload));
    yield put(getCountriesSuccess(response.data));
  } catch (err) {
    yield put(getCountriesError(err));
  }
}

function* getCountryByNameSaga({ payload }: TGetCountry) {
  try {
    const response = yield call(api.get, API.GET_COUNTRY_BY_NAME(payload));
    yield put(getCountrySuccess(response.data[0] || null));
  } catch (err) {
    yield put(getCountryError(err));
  }
}

export default function*() {
  yield takeLatest(GET_COUNTRY_REQUEST, getCountryByNameSaga);
  yield takeLatest(GET_COUNTRIES_REQUEST, getRegionCountriesSaga);
}
