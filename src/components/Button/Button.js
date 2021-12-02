import React from 'react';
import styled from 'styled-components';
import {
  space,
  layout,
  color,
  variant,
  typography,
  border,
  position,
} from 'styled-system';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant,
  disabled,
  onClick,
  height,
  width,
  fontWeight,
  rounded,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      variant={disabled ? 'disabled' : variant}
      disabled={disabled}
      onClick={onClick}
      rounded={rounded}
      height={height}
      width={width}
      fontWeight={fontWeight}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button(
  ({ rounded, height, width, fontWeight }) => `
    font-family: Montserrat, sans-serif;
    height: ${height};
    width: ${width};
    font-weight: ${fontWeight};
    border: 1px solid transparent;
    padding: 0 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: ${rounded ? '40px' : '0px'};
  `,
  variant({
    variants: {
      primary: {
        bg: 'brown',
        color: 'white',
        '&:hover': {
          opacity: 0.9,
        },
      },
      'primary-outlined': {
        padding: '0px 10px',
        bg: 'transparent',
        color: 'brown',
        opacity: 1,
        borderColor: 'brown',
        '&:hover': {
          opacity: 0.9,
        },
      },
      'primary-text': {
        fontSize: '12px',
        padding: '0px',
        bg: 'transparent',
        color: 'brown',
        textDecoration: 'underline',
        opacity: 1,
        '&:hover': {
          opacity: 0.9,
        },
      },
      disabled: {
        bg: 'gray',
        color: 'black',
        opacity: 0.4,
      },
    },
  }),
  space,
  layout,
  color,
  typography,
  border,
  position
);

StyledButton.defaultProps = {
  variant: 'primary',
  rounded: true,
  type: 'button',
  disabled: false,
  height: '42px',
};

StyledButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'primary-outlined', 'primary-text']),
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export { Button };
