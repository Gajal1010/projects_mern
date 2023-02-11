import { css } from 'styled-components';

export default css`
  body {
    margin: 0;
    padding: 0;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  ul {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style-type: none;
  }
  button {
    border: none;
  }
  button:focus {
    outline: 0;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
`;
