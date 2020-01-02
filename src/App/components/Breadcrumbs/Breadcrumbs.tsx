import React, { FC } from 'react';
import { Breadcrumbs, makeStyles, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    textTransform: 'capitalize'
  }
});

type TItem = { label: string; path?: string };

type TProps = {
  items: TItem[];
};

const CustomBreadcrumbs: FC<TProps> = props => {
  const styles = useStyles();
  const { items } = props;

  return (
    <Breadcrumbs className={styles.root}>
      {items.map((item, index) => {
        if (item.path) {
          return (
            <NavLink key={index} to={item.path}>
              {item.label}
            </NavLink>
          );
        }

        return <Typography key={index}>{item.label}</Typography>;
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
