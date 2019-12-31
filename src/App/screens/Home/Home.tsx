import { Typography, List, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  link: {
    display: 'block',
    padding: '4px 0',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: '#eee'
    }
  }
});

const Home: FC = () => {
  const styles = useStyles();

  return (
    <div>
      <Typography variant="h2">Regions</Typography>
      <List>
        <NavLink className={styles.link} to="/region/europe">
          Europe
        </NavLink>

        <NavLink className={styles.link} to="/region/africa">
          Africa
        </NavLink>
        <NavLink className={styles.link} to="/region/asia">
          Asia
        </NavLink>
        <NavLink className={styles.link} to="/region/oceania">
          Oceania
        </NavLink>
        <NavLink className={styles.link} to="/region/americas">
          Americas
        </NavLink>
      </List>
    </div>
  );
};

export default Home;
