import React from 'react';
import styled from 'styled-components';
import { space, layout, position } from 'styled-system';

const Image = ({ alt, src, ...props }) => {
  return <StyledImage {...props} alt={alt} src={src} />;
};

const StyledImage = styled.img`
  ${position};
  ${space};
  ${layout};
`;

export { Image };
