import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

import { Column } from '../Grid';
import { Text } from '../Text';
import { ErrorMessage } from './';

// eslint-disable-next-line react/display-name
const TextField = forwardRef(
  (
    {
      onChange,
      label,
      name,
      placeholder,
      error,
      disabled,
      inputType,
      bgColor,
      ...props
    },
    ref
  ) => {
    const [typeVisiblePassword, setTypeVisiblePassword] = useState(inputType);
    const [isValidInput, setIsValidInput] = useState(false);

    return (
      <Column {...props}>
        {!!label && (
          <Text
            mb="8px"
            color="mediumBrown"
            fontSize="12px"
            lineHeight="40px"
            fontWeight="600"
          >
            {label}
          </Text>
        )}
        <StyledInput
          hasError={!!error}
          className={'inputWithIcon'}
          isValidInput={isValidInput}
          onChange={() => setIsValidInput(true)}
          inputType={inputType}
        >
          <StyledTextField
            type={inputType === 'password' ? typeVisiblePassword : inputType}
            placeholder={placeholder}
            ref={ref}
            name={name}
            onChange={onChange}
            disabled={!!disabled}
            hasError={!!error}
            bgColor={bgColor}
          />
          {inputType === 'text' && !!error ? (
            <BsIcons.BsExclamationCircle size="24" />
          ) : (
            inputType === 'text' && <AiIcons.AiOutlineCheck size="24" />
          )}
          {inputType === 'password' && typeVisiblePassword === 'password' ? (
            <AiIcons.AiOutlineEyeInvisible
              onClick={() => setTypeVisiblePassword('text')}
              size="24"
            />
          ) : (
            inputType === 'password' && (
              <AiIcons.AiOutlineEye
                onClick={() => setTypeVisiblePassword('password')}
                size="24"
              />
            )
          )}
        </StyledInput>
        {!!error && (
          <ErrorMessage fontSize="13px" mt="6px">
            {error}
          </ErrorMessage>
        )}
      </Column>
    );
  }
);

const StyledTextField = styled.input`
  ${({ hasError, bgColor, theme: { colors } }) => css`
    background-color: ${bgColor ? colors[bgColor] : colors.white};
    color: ${colors.mediumBrown};
    height: 46px;
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

const StyledInput = styled.div`
  ${({ hasError, theme: { colors } }) => css`
    svg {
      position: absolute;
      right: 10px;
      margin: 10px 0px;
      fill: ${colors.lightGray};
      transition: 0.3s;
    }
    input:focus + svg {
      fill: ${hasError ? colors.red : colors.mediumBrown};
    }
    &.inputWithIcon {
      position: relative;
    }
    input + svg {
      ${({ hasError, isValidInput, inputType }) => css`
        fill: ${hasError
          ? 'red'
          : isValidInput && inputType === 'text'
          ? '#32cd00'
          : '#ed4da'};
      `}
    }
  `}
`;

TextField.propTypes = {
  onChange: PropTypes.func,
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export { TextField };
