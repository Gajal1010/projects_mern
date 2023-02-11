import { createGlobalStyle } from 'styled-components';
import resetStyles from './resetStyles';

const GlobalStyles = createGlobalStyle`
  ${resetStyles}

  html {
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

* {
  box-sizing: border-box;
}
  html,
  body {
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
    font-family: Boing,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;
  }

  img {
    width: auto;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
`;

export default GlobalStyles;