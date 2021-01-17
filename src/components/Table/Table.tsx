import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
import React from 'react';
import { RowData } from 'src/types/Table';
import { tableIcons } from './TableIcons';

const combine = (data: RowData) => {
  return Object.keys(data).reduce((acc: any, value: any) => {
    acc = [...acc, ...data[value]];
    return acc;
  }, []);
};

const Table: React.FC<any> = ({ tableData, columns }) => {
  const { bpi } = tableData;
  const combineData = combine(bpi);
  return (
    <MaterialTable
      icons={tableIcons}
      options={{
        search: false,
        showTitle: false,
        toolbar: false,
        filtering: false,
        paging: false,
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        }
      }}
      data={combineData}
      columns={columns}
    />
  );
};

export default Table;
