import React from 'react';
import styled, { css } from 'styled-components';

import { Column, Row } from '../../components/Grid';
import { Text } from '../../components/Text';

const Note = ({ title, ...props }) => (
  <StyledColumn {...props} width={['137px', '137px', '154px']}>
    <Row>
      <StyledText color="black" fontSize="20px">
        {title}
      </StyledText>
    </Row>
  </StyledColumn>
);

const StyledText = styled(Text)`
  line-break: auto;
  line-height: 25px;
`;

const StyledColumn = styled(Column)`
  ${({ theme: { colors } }) => css`
    height: 178px;
    padding: 10px;
    background: #faf2ec;
    box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    overflow: auto;
    line-break: anywhere;
    ::-webkit-scrollbar-button {
      width: 2px;
      height: 50px;
    }
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(213 180 162 / 84%);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px ${colors.lightBrown};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgb(213 180 162);
    }
  `}
`;

export { Note };
