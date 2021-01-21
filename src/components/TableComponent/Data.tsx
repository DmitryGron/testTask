import React from 'react';
import styled from 'styled-components';
import TableCell from './TableCell';

const TableData: React.FC<any> = ({ data, meta }) => {
  const headerOrder = meta.map((m: { field: string | number }) => m.field);
  return (
    <StyledBody>
      {data.map((row: any[], rowKey: number) => (
        <tr key={rowKey}>
          {row.map((_cell, cellKey) => {
            if (row.find((r) => r.field === headerOrder[cellKey])) {
              return (
                <TableCell key={cellKey} data={row.find((r) => r.field === headerOrder[cellKey])} />
              );
            }
          })}
        </tr>
      ))}
    </StyledBody>
  );
};

const StyledBody = styled.tbody`
  background-color: #e0e0e0;
`;

export default TableData;
