import styled, { css } from 'styled-components';
import { space, layout, color, position } from 'styled-system';

const ErrorMessage = styled.p`
  ${({ fontSize, theme: { colors } }) => css`
    font-size: ${fontSize ? fontSize : '12px'};
    color: ${colors.red};
    margin-left: 4px;
    ${color};
    ${position};
    ${space};
    ${layout};
  `}
`;

export { ErrorMessage };
