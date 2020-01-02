import React, { FC, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme
} from '@material-ui/core';
import { GET_COUNTRIES, getCountries, setOrder } from '../../../store/countries/countries.actions';
import { TStore } from '../../../redux/rootReducer';
import { createLoadingSelector } from '../../../store/loading/loading.selectors';
import { createErrorSelector } from '../../../store/errors/errors.selectors';
import { Spinner } from '../../components/Spinner';
import { EOrder, EOrderBy } from 'store/countries/countries.reducer';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const loadingSelector = createLoadingSelector([GET_COUNTRIES]);
const errorSelector = createErrorSelector([GET_COUNTRIES]);
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    '& td': {
      cursor: 'pointer'
    }
  },
  flag: {
    width: 40,
    height: 'auto',
    display: 'inline-block',
    marginRight: theme.spacing(2)
  }
}));

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type TProps = RouteComponentProps<{ regionName: string }> &
  typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

const Region: FC<TProps> = props => {
  const styles = useStyles();
  const {
    items,
    getData,
    loading,
    error,
    history,
    orderBy,
    order,
    setDataOrder,
    match: {
      params: { regionName }
    }
  } = props;

  useEffect(() => {
    if (regionName) {
      getData(regionName);
    }
  }, [regionName, getData]);
  const sortedItems = useMemo(() => {
    return items.sort((a, b) =>
      order === EOrder.DESC ? desc(a, b, orderBy) : -desc(a, b, orderBy)
    );
  }, [items, order, orderBy]);

  const handleSort = (property: EOrderBy) => {
    const isAsc = orderBy === property && order === EOrder.ASC;

    setDataOrder({
      orderBy: property,
      order: isAsc ? EOrder.DESC : EOrder.ASC
    });
  };

  if (!loading && error) {
    return <ErrorMessage>Please check region or try later</ErrorMessage>;
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'regions', path: '/' }, { label: regionName }]} />
      {loading ? (
        <Spinner />
      ) : (
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th">
                <TableSortLabel
                  active={orderBy === EOrderBy.NAME}
                  direction={orderBy === EOrderBy.NAME ? order : EOrder.ASC}
                  onClick={() => {
                    handleSort(EOrderBy.NAME);
                  }}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell component="th">
                <TableSortLabel
                  active={orderBy === EOrderBy.POPULATION}
                  direction={orderBy === EOrderBy.POPULATION ? order : EOrder.ASC}
                  onClick={() => {
                    handleSort(EOrderBy.POPULATION);
                  }}
                >
                  Population
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map(item => {
              return (
                <TableRow
                  hover
                  key={item.name}
                  onClick={() => {
                    history.push(`/region/${regionName}/${item.name}`);
                  }}
                >
                  <TableCell>
                    <img className={styles.flag} src={item.flag} alt={`${item.name} flag`} />
                    {item.name}
                  </TableCell>
                  <TableCell>{item.population.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

const mapDispatchToProps = { getData: getCountries, setDataOrder: setOrder };
const mapStateToProps = (state: TStore) => {
  const { data, orderBy, order } = state.countries;

  return {
    order,
    orderBy,
    items: data,
    loading: loadingSelector(state),
    error: errorSelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Region));
