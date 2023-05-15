import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import Content from './routes/Content';
import GlobalStyle from './styles/Globals';
import ShopperContext from './context/ShopperContext';
import { lightTheme, darkTheme } from './components/Themes';

function App() {
  const { theme } = useContext(ShopperContext);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div>
        <GlobalStyle />
        <Content />
      </div>
    </ThemeProvider>
  );
}

export default App;
