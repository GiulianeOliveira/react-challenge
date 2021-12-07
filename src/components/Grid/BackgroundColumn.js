import styled, { css } from 'styled-components';

import { Column } from './';

export const BackgroundColumn = styled(Column)`
  ${({ backgroundImage }) => css`
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: auto 710px;
    height: 100%;
    min-height: 812px;
    margin-top: 60px;
  `}
`;
