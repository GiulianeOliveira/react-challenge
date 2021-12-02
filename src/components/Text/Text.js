import React from 'react';
import styled from 'styled-components';
import { space, layout, color, position, typography } from 'styled-system';

const Text = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};

const StyledText = styled.p`
  ${color};
  ${position};
  ${space};
  ${layout};
  ${typography};
`;

export { Text };
