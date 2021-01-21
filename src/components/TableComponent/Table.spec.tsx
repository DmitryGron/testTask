import { shallow, configure } from 'enzyme';
import React from 'react';
import Table from './Table';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const createComponent = ({ tableData, columns }) => {
  return shallow(<Table tableData={tableData} columns={columns} />);
};

describe('<Table />', () => {
  it('should render Table', () => {
    const columns = [
      { text: 'Automobile Company', field: 'name' },
      { text: 'Years Since Purchase', field: 'age' },
      { text: 'Color', field: 'color' }
    ];
    const tableData = {
      bpi: [
        { Porsche: { name: 'Porsche', age: 2, color: 'Blue' } },
        { BMW: { name: 'BMW', age: 1, color: 'Grey' } },
        { Renault: { name: 'Renault', age: 2, color: 'Yellow' } }
      ]
    };
    const wrapper = createComponent({ tableData, columns });
    expect(wrapper.is(Table)).toHaveBeenCalled;
  });
});
