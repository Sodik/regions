import React, { FC } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const Spinner: FC = () => {
  return (
    <Grid container justify="center">
      <CircularProgress />
    </Grid>
  );
};

export default Spinner;
