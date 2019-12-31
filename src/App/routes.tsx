import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './screens/Home';
import { Region } from './screens/Region';
import { CountryDetails } from './screens/CountryDetails';

export default () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/region/:name" component={Region} />
    <Route exact={true} path="/region/:name/:countryName" component={CountryDetails} />
  </Switch>
);
