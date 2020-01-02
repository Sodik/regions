import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import { makeStyles, Container, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    body: {
      margin: 0
    }
  },
  homeLink: {
    color: '#fff',
    textDecoration: 'none',
    textTransform: 'uppercase'
  },
  content: {
    paddingTop: theme.spacing(2)
  }
}));

const App = () => {
  const styles = useStyles();

  return (
    <>
      <Container className={styles.content}>
        <Routes />
      </Container>
    </>
  );
};

export default withRouter(App);
