import React from 'react';
import styled, { css } from 'styled-components';

import { Row } from '../Grid';

const Loader = ({ ...props }) => {
  return (
    <StyledLoader
      {...props}
      width={['60px', '60px', '100px']}
      height={['60px', '60px', '100px']}
    ></StyledLoader>
  );
};

const StyledLoader = styled(Row)`
  ${({ theme: { colors } }) => css`
    border: 6px solid ${colors.lightBrown};
    border-radius: 50%;
    border-top: 6px solid ${colors.brown};
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;

export { Loader };
