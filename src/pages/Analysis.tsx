import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../types/AppState';
import { thunkFetchPage } from '../store/analysis/actions';
import { Link } from 'react-router-dom';
import { getPage } from '../store/analysis/reducers';
import If from '../components/If';

const getSortedTags = (data: HTMLDivElement) => {
  const elements = data.getElementsByTagName('*');
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

const getDomDepthLevel = (root = document.documentElement) => {
  let pathInfo = {
    route: [],
    unique: [],
    duplicates: [],
    level: 0
  };
  for (let i = 0, j = root.children.length; i < j; i++) {
    const curNodePathInfo = getDomDepthLevel(root.children[i] as HTMLElement);
    if (curNodePathInfo.level > pathInfo.level) {
      pathInfo = curNodePathInfo;
    }
  }
  Array.from(pathInfo.route).filter((element, index) => {
    const tagName = pathInfo.route[index].tagName.toLowerCase();
    if (pathInfo.unique.indexOf(tagName) === -1) {
      pathInfo.unique.push(tagName);
    } else {
      pathInfo.duplicates.push(tagName);
    }
  });
  pathInfo.route.unshift(root);
  pathInfo.level += 1;
  return pathInfo;
};

const Analysis: React.FC = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const data = useSelector(getPage);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [duplicateTags, setDuplicateTags] = useState([]);
  const [deep, setDeepTags] = useState<any>();

  const [input, setInput] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      const temp = document.createElement('div');
      temp.innerHTML = data.trim();
      const sorted = getSortedTags(temp);
      const deepness = getDomDepthLevel(temp);
      setDeepTags(deepness);
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
      <If condition={deep}>
        <Container>
          <p>deep level: {deep?.level}</p>
          <p>
            deep tags:
            {deep?.duplicates.sort().map((tag: string) => ` ${tag}`)}
          </p>
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
