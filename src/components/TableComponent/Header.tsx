import React from 'react';
import styled from 'styled-components';
import icon from './icon.svg';

const TableHeader: React.FC<any> = ({ headers, sort, sortOrder, sortKey }) => {
  const handleClick = (field: any) => {
    sort(field);
  };
  return (
    <Header>
      <tr>
        {headers.map((data: any, i: number) => (
          <Cell key={i}>
            {data.text}
            <Button onClick={() => handleClick(data.field)}>
              <Icon className={sortOrder && data.field === sortKey ? 'inc' : 'dec'} src={icon} />
            </Button>
          </Cell>
        ))}
      </tr>
    </Header>
  );
};

const Cell = styled.td`
  border: solid 1px #000;
  padding: 10px;
`;

const Header = styled.thead`
  background-color: #87bad8;
  font-weight: bold;
`;

const Button = styled.button`
  cursor: pointer;
  margin-left: 10px;
  border: none;
  background-color: #87bad8;
  outline: none;
`;

const Icon = styled.img`
  &.dec {
    transform: rotate(180deg);
  }
`;

export default TableHeader;
