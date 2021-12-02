import React from 'react';
import styled from 'styled-components';
import { space, layout, flexbox, color, position } from 'styled-system';

const Row = ({ children, ...props }) => {
  return <Wrap {...props}>{children}</Wrap>;
};

const Wrap = styled.div`
  display: flex;
  ${layout};
  ${flexbox};
  ${color};
  ${position};
  ${space};
`;

export { Row };
