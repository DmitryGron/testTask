import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RowData } from '../../types/Table';
import TableData from './Data';
import TableHeader from './Header';

const normalizeData = (data: { [x: string]: any }[]) => {
  return data.map((td: { [x: string]: any }) =>
    Object.keys(td).map((key) => ({ field: key, text: td[key] }))
  );
};

const combine = (data: RowData) => {
  return Object.keys(data).reduce(
    (acc: any, value: any) => (data[value] ? [...acc, ...data[value]] : acc),
    []
  );
};

const compareObjects = (
  object1: { [x: string]: string },
  object2: { [x: string]: string },
  key: string,
  order: boolean
) => {
  const obj1 = object1[key].toUpperCase();
  const obj2 = object2[key].toUpperCase();
  if (order) {
    if (obj1 > obj2) {
      return -1;
    }
    if (obj1 < obj2) {
      return 1;
    }
    return 0;
  } else {
    if (obj1 < obj2) {
      return -1;
    }
    if (obj1 > obj2) {
      return 1;
    }
    return 0;
  }
};

const Table: React.FC<any> = ({ tableData, columns }) => {
  const [sortKey, setSortKey] = useState<string>('code');
  const [sortOrder, setSortOrder] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const { bpi } = tableData;

  const callSetSort = (key: string) => {
    setSortKey(key);
    setSortOrder(!sortOrder);
  };

  useEffect(() => {
    const sorted = normalizeData(
      combine(bpi).sort((row1: { [x: string]: string }, row2: { [x: string]: string }) =>
        compareObjects(row1, row2, sortKey, sortOrder)
      )
    );
    setData(sorted);
  }, [bpi, sortKey, sortOrder]);

  return (
    <Container>
      <TableHeader headers={columns} sort={callSetSort} sortKey={sortKey} sortOrder={sortOrder} />
      <TableData data={data} meta={columns} />
    </Container>
  );
};

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  caption-side: bottom;
`;
export default Table;
