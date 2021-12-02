import React from 'react';
import styled from 'styled-components';
import { space, layout, flexbox, color, position, border } from 'styled-system';

const Column = ({ children, ...props }) => {
  return <Wrap {...props}>{children}</Wrap>;
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  ${flexbox};
  ${color};
  ${position};
  ${space};
  ${layout};
  ${border};
`;

export { Column };
