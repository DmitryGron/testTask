import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../types/AppState';
import { thunkFetchPage } from '../store/analysis/actions';
import { Link } from 'react-router-dom';

const Analysis: React.FC = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [input, setInput] = useState('');

  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };
  const handleClick = () => {
    dispatch(thunkFetchPage(input));
  };

  return (
    <Container>
      <LinkContainer>
        <Link to='/currencies'>Currencies</Link>
      </LinkContainer>
      <Subtitle> Page analysis </Subtitle>
      <input onChange={handleChange} type='input' placeholder='some url' />
      <button disabled={input.length === 0 ? true : false} onClick={handleClick}>
        Get page
      </button>
    </Container>
  );
};

const Container = styled.div`
  margin: 50px;
`;

const Subtitle = styled.div`
  margin-bottom: 10px;
`;

const LinkContainer = styled.div`
  margin-bottom: 20px;
`;
export default Analysis;
