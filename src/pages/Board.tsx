import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import If from '../components/If';
import Table from '../components/TableComponent/Table';
import { thunkFetchCurrencies } from '../store/currencies/actions';
import { getCurrencies } from '../store/currencies/reducers';
import { AppThunkDispatch } from '../types/AppState';

const Board: React.FC = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const data = useSelector(getCurrencies);
  const tableColumns = [
    { text: 'Currency', field: 'code' },
    { text: 'Rate', field: 'rate' },
    { text: 'Description', field: 'description' }
  ];
  const fetchData = useCallback(() => {
    dispatch(thunkFetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (data.length === 0 && data !== 'loading') {
      dispatch(thunkFetchCurrencies());
    }
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [data, dispatch, fetchData]);

  return (
    <Container>
      <If condition={data === 'error'}>
        <h3> Something went wrong! Please reload page </h3>
      </If>
      <If condition={data === 'loading'}>
        <h3> LOADING DATA... </h3>
      </If>
      <If condition={data !== 'error' && data.length !== 0 && data !== 'loading'}>
        <Subtitle>{data.chartName}</Subtitle>
        <Subtitle>Updated {data.time?.updateduk} | Updating real time each 10 seconds</Subtitle>
        <Subtitle>{data.disclaimer}</Subtitle>
        <Table tableData={data} columns={tableColumns} />
      </If>
    </Container>
  );
};

const Container = styled.div`
  margin: 50px;
`;
const Subtitle = styled.div`
  margin-bottom: 10px;
`;
export default Board;
