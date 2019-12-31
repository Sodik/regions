import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Routes from './routes';
import { makeStyles, Container, AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles({
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
    paddingTop: 100
  }
});

const App = () => {
  const styles = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <NavLink className={styles.homeLink} to="/">
            Home
          </NavLink>
        </Toolbar>
      </AppBar>
      <Container className={styles.content}>
        <Routes />
      </Container>
    </>
  );
};

export default withRouter(App);
