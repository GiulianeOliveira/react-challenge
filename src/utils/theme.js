import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.colors.lightBrown};
    font: 400 16px Montserrat, sans-serif;
  }
`;

const theme = {
  colors: {
    black: '#333438',
    white: '#FEFEF8',
    lightGray: '#ced4da',
    gray: '#333438',
    faintBrown: '#FAF2EC',
    lightBrown: '#F8E5D6',
    brown: '#834825',
    mediumBrown: '#804627',
    red: '#bf1650',
  },
};

// const breakpoints = ['40em', '52em', '64em', '80em'];

// breakpoints.sm = breakpoints[0];
// breakpoints.md = breakpoints[1];
// breakpoints.lg = breakpoints[2];
// breakpoints.xl = breakpoints[3];

// export default {
//   breakpoints,
// };

export { GlobalStyle, theme };
