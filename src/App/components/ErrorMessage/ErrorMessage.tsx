import React, { FC } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    color: '#c00'
  }
});

const ErrorMessage: FC = props => {
  const styles = useStyles();
  const { children } = props;

  return <Typography className={styles.root}>{children}</Typography>;
};

export default ErrorMessage;
