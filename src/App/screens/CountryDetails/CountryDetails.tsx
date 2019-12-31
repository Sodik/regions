import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TStore } from '../../../redux/rootReducer';
import { createLoadingSelector } from '../../../store/loading/loading.selectors';
import { createErrorSelector } from '../../../store/errors/errors.selectors';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Spinner } from '../../components/Spinner';
import { GET_COUNTRY, getCountry } from '../../../store/countries/countries.actions';
import { ErrorMessage } from 'App/components/ErrorMessage';

const loadingSelector = createLoadingSelector([GET_COUNTRY]);
const errorSelector = createErrorSelector([GET_COUNTRY]);

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'flex',
    borderBottom: '1px solid #ccc',
    marginBottom: theme.spacing(1),
    '&:last-child': {
      border: 'none'
    }
  },
  value: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1)
  },
  flag: {
    height: 120,
    width: 'auto'
  }
}));

type TRouteParams = RouteComponentProps<{ countryName: string }>;
type TProps = TRouteParams & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CountryDetails: FC<TProps> = props => {
  const styles = useStyles();
  const {
    country,
    getDetails,
    error,
    loading,
    match: {
      params: { countryName }
    }
  } = props;

  const renderDetails = (data: any[] | any): any => {
    if (!data) {
      return '-';
    }
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return '-';
      }

      return data.map((dataItem, index) => {
        return <div key={index}>{renderDetails(dataItem)}</div>;
      });
    }

    if (typeof data === 'object') {
      return Object.entries(data).map((item: any) => {
        const [name, value] = item;

        return (
          <div className={styles.item} key={name}>
            <div>{name}:</div>
            <div className={styles.value}>{renderDetails(value)}</div>
          </div>
        );
      });
    }

    return data;
  };

  useEffect(() => {
    if (!country) {
      getDetails(countryName);
    }
  }, [country, countryName, getDetails]);

  if (error && !country) {
    return <ErrorMessage>Not Found</ErrorMessage>;
  }

  if (country && !loading) {
    const { name, flag, ...details } = country;

    return (
      <div>
        <Typography variant="h2">{name}</Typography>
        <img className={styles.flag} src={flag} alt={`${name} flag`} />
        {renderDetails(details)}
      </div>
    );
  }

  return loading ? <Spinner /> : null;
};

const mapStateToProps = (state: TStore, props: TRouteParams) => {
  const {
    match: {
      params: { countryName }
    }
  } = props;

  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    country: state.countries.data.find(item => item.name === countryName)
  };
};
const mapDispatchToProps = { getDetails: getCountry };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CountryDetails));
