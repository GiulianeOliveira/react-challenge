import React from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../Grid';
import { Text } from '../Text';

const Journal = ({ numberJournal = 0, name, hasCategories, ...props }) => {
  return (
    <StyledJournal
      colorDefined={
        hasCategories
          ? numberJournal % 2 === 0
            ? 'babyBlue'
            : 'blue'
          : 'lightBrown'
      }
      width={!hasCategories ? ['240px', '240px', '300px'] : '150px'}
      height={!hasCategories ? ['332px', '332px', '400px'] : '214px'}
      {...props}
    >
      <VerticalDivider
        colorDefined={hasCategories ? 'lightBlue' : 'lightBrown'}
        height={!hasCategories ? ['329px', '329px', '394px'] : '208px'}
      />
      <StyledColumn
        width={!hasCategories ? '150px' : '100px'}
        margin={!hasCategories ? 'auto' : 'auto auto auto 28px'}
      >
        <Text
          margin="auto"
          fontFamily="Abhaya Libre"
          fontWeight="700"
          fontSize={
            !hasCategories ? ['24px', '24px', '30px'] : ['20px', '20px', '24px']
          }
          color={numberJournal % 2 !== 0 ? 'white' : 'black'}
        >
          {name}
        </Text>
      </StyledColumn>
    </StyledJournal>
  );
};

const StyledColumn = styled(Column)`
  word-break: break-word;
  align-items: center;
  text-align: center;
`;

const StyledJournal = styled(Column)`
  ${({ colorDefined, theme: { colors } }) => css`
    cursor: pointer;
    border: 1px solid ${colors[colorDefined]};
    background: ${colors[colorDefined]};
    border-radius: 2px 20px 20px 2px;
    box-shadow: inset 0px 2px 4px rgba(255, 255, 255, 0.25),
      inset -4px -4px 4px rgba(0, 0, 0, 0.1);
  `}
`;

const VerticalDivider = styled(Column)`
  ${({ colorDefined, theme: { colors } }) => css`
    position: absolute;
    border-left: 18px solid ${colors[colorDefined]};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px 0px 0px 2px;
  `}
`;

export { Journal };
