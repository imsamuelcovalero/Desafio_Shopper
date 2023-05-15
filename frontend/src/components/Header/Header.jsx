import React from 'react';
import ThemeComponent from './ThemeComponent';
import { HeaderS } from './Style';

function Header() {
  return (
    <HeaderS>
      <div id="main">
        {/* Cria uma span com o texto Main que encaminha para a página de mesmo nome */}
        <span id="name">
          Olá!
        </span>
        <span id="greetings">
          Seja bem-vindo(a) ao Aplicativo de atualização de preço de Produtos Shopper!
        </span>
        {/* <span id="cart">
          <FaShoppingCart id="cartIcon" />
          Total de seu carrinho:
          {' '}
          {formatCurrency(balance).replace('.', ',')}
        </span> */}
      </div>
      <div id="themeDiv">
        <ThemeComponent />
      </div>
    </HeaderS>
  );
}

export default Header;
