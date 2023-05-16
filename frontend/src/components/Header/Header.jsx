import React from 'react';
import ThemeComponent from './ThemeComponent';
import { HeaderS } from './Style';

function Header() {
  return (
    <HeaderS>
      <div id="main">
        <span id="name">
          Olá!
        </span>
        <span id="greetings">
          Seja bem-vindo(a) ao Aplicativo de atualização de preço de Produtos Shopper!
        </span>
      </div>
      <div id="themeDiv">
        <ThemeComponent />
      </div>
    </HeaderS>
  );
}

export default Header;
