import React from 'react';
import styled from 'styled-components';

const TableCell: React.FC<any> = ({ data }) => {
  const { text } = data;
  return <Cell>{text}</Cell>;
};

const Cell = styled.td`
  border: solid 1px #000;
  padding: 10px;
`;

export default TableCell;
