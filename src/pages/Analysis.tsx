import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../types/AppState';
import { thunkFetchPage } from '../store/analysis/actions';
import { Link } from 'react-router-dom';
import { getPage } from '../store/analysis/reducers';
import If from '../components/If';

const getSortedTags = (innerHTML: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = innerHTML.trim();
  const elements = temp.getElementsByTagName('*');
  const unique = [];
  const duplicates = [];

  Array.from(elements).filter((element, index) => {
    const tagName = elements[index].tagName.toLowerCase();
    if (unique.indexOf(tagName) === -1) {
      unique.push(tagName);
    } else {
      duplicates.push(tagName);
    }
  });
  return { unique, duplicates };
};

const Analysis: React.FC = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const data = useSelector(getPage);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [duplicateTags, setDuplicateTags] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      const sorted = getSortedTags(data);
      setUniqueTags(sorted.unique.sort());
      setDuplicateTags(sorted.duplicates.sort());
    }
  }, [data, input]);

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
      <button type='submit' disabled={input.length === 0 ? true : false} onClick={handleClick}>
        Get page
      </button>
      <If condition={uniqueTags.length > 0}>
        <Container>
          unique tags:
          {uniqueTags.map((tag) => ` ${tag}`)}
        </Container>
      </If>
      <If condition={duplicateTags.length > 0}>
        <Container>
          duplicate tags:
          {duplicateTags.map((tag) => ` ${tag}`)}
        </Container>
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

const LinkContainer = styled.div`
  margin-bottom: 20px;
`;
export default Analysis;
