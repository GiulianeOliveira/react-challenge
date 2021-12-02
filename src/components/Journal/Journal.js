import React from 'react';
import styled from 'styled-components';

import { Column } from '../Grid';
import { Text } from '../Text';

const Journal = ({ name, hasCategories, ...props }) => {
  return (
    <StyledJournal
      width={!hasCategories ? ['240px', '240px', '300px'] : '150px'}
      height={!hasCategories ? ['332px', '332px', '400px'] : '214px'}
      {...props}
    >
      <VerticalDivider
        height={!hasCategories ? ['329px', '329px', '394px'] : '208px'}
      />
      <StyledColumn
        margin="auto"
        width={!hasCategories ? '150px' : '60px'}
        alignItems="center"
      >
        <Text
          fontFamily="Abhaya Libre"
          fontWeight="700"
          fontSize={
            !hasCategories ? ['24px', '24px', '30px'] : ['20px', '20px', '24px']
          }
        >
          {name}
        </Text>
      </StyledColumn>
    </StyledJournal>
  );
};

const StyledColumn = styled(Column)`
  word-break: break-word;
`;

const StyledJournal = styled(Column)`
  cursor: pointer;
  border: 1px solid rgba(248, 229, 214, 1);
  background: rgba(248, 229, 214, 1);
  border-radius: 2px 20px 20px 2px;
  box-shadow: inset 0px 2px 4px rgba(255, 255, 255, 0.25),
    inset -4px -4px 4px rgba(0, 0, 0, 0.1);
`;

const VerticalDivider = styled(Column)`
  position: absolute;
  border-left: 18px solid #f8e5d6;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px 0px 0px 2px;
`;

export { Journal };
