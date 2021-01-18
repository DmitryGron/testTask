import If from 'components/If';
import Table from 'components/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchCurrencies } from 'src/store/currencies/actions';
import { getCurrencies } from 'src/store/currencies/reducers';
import { AppThunkDispatch } from 'src/types/AppState';
import styled from 'styled-components';

const Board: React.FC = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const data = useSelector(getCurrencies);
  const tableColumns = [
    { title: 'Currency', field: 'code' },
    { title: 'Rate', field: 'rate' },
    { title: 'Description', field: 'description' }
  ];
  const fetchData = useCallback(() => {
    dispatch(thunkFetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(thunkFetchCurrencies());
    }
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [data, dispatch, fetchData]);

  return (
    <Container>
      <If condition={data === 'error'}>
        <h3> Something went wrong! </h3>
      </If>
      <If condition={data !== 'error' && data.length !== 0}>
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
