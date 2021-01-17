import React from 'react';

interface Props {
  condition: boolean;
}

const If: React.FC<Props> = ({ children, condition }) => (condition ? <>{children}</> : <></>);
export default If;
