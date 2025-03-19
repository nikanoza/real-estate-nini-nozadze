import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: FiraGO, sans-serif;
    background-color: white;
   min-width: 100vw;
    min-height: 100vh;
  }
`;

export default GlobalStyle;
