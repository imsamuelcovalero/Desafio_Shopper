import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    font-size: 16px;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.background};
    /* transition: all 0.03s linear; */
    color: ${({ theme }) => theme.paragraph};
    h1 {
      color: ${({ theme }) => theme.headline};
    }
  }
  
  body html #root {
    height: 100%;
  }

  //define as cores do root
  :root {
    --background: ${({ theme }) => theme.background};
    --main: ${({ theme }) => theme.main};
    --headline: ${({ theme }) => theme.headline};
    --paragraph: ${({ theme }) => theme.paragraph};
    --buttonBorder: ${({ theme }) => theme.buttonBorder};
    --buttonText: ${({ theme }) => theme.buttonText};
    --buttonBackground: ${({ theme }) => theme.buttonBackground};
    --buttonBackgroundDisabled: ${({ theme }) => theme.buttonBackgroundDisabled};
    --secundary: ${({ theme }) => theme.secundary};
    --secundaryHover: ${({ theme }) => theme.secundaryHover};
    --tertiary: ${({ theme }) => theme.tertiary};
    --extra: ${({ theme }) => theme.extra};
    --extraHover: ${({ theme }) => theme.extraHover};
  }
`;
