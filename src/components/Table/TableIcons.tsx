import { SvgIcon } from '@material-ui/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import { Icons } from 'material-table';
import React, { forwardRef, Ref } from 'react';

const iconComponentByTableIconType: Record<keyof Icons, typeof SvgIcon> = {
  Add: AddBox,
  Check,
  Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage,
  LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search,
  SortArrow: ArrowDownward,
  ThirdStateCheck: Remove,
  ViewColumn,
  Retry: Check
};

export const tableIcons = Object.entries(iconComponentByTableIconType).reduce(
  (currentTableIcons: Icons, [tableIconType, IconComponent]) => {
    currentTableIcons[
      tableIconType as keyof Icons
    ] = forwardRef((props, ref: Ref<SVGSVGElement>) => <IconComponent {...props} ref={ref} />);
    return currentTableIcons;
  },
  {}
);
