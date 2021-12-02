import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../Grid';
import { ErrorMessage } from '../TextField';

// eslint-disable-next-line react/display-name
const TextArea = forwardRef(
  (
    { onChange, name, error, disabled, bgColor, placeholder, ...props },
    ref
  ) => {
    return (
      <Column {...props}>
        <StyledTextArea
          placeholder={placeholder}
          rows="6"
          cols="40"
          ref={ref}
          name={name}
          onChange={onChange}
          disabled={!!disabled}
          hasError={!!error}
          bgColor={bgColor}
        />
        {!!error && (
          <ErrorMessage fontSize="13px" mt="6px">
            {error}
          </ErrorMessage>
        )}
      </Column>
    );
  }
);

const StyledTextArea = styled.textarea`
  ${({ hasError, bgColor, theme: { colors } }) => css`
    background-color: ${bgColor ? colors[bgColor] : colors.white};
    color: ${colors.mediumBrown};
    height: 380px;
    line-height: 40px;
    font-weight: 600;
    font-size: 12px;
    width: 100%;
    border: 1px solid ${hasError ? colors.red : 'transparent'};
    border-radius: 4px;
    outline: none;
    padding: 8px 16px;
    transition: 0.3s;
    padding-left: 16px;
    :focus {
      box-shadow: 0px 0px 2px 2px rgba(248 229 214);
      border-color: ${hasError ? colors.red : colors.mediumBrown};
    }
  `}
`;

export { TextArea };
