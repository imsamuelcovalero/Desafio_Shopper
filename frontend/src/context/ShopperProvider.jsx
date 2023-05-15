import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ShopperContext from './ShopperContext';

function ShopperProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  ShopperProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <ShopperContext.Provider value={contextValue}>
      {children}
    </ShopperContext.Provider>
  );
}

export default ShopperProvider;
