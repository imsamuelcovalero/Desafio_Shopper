import React, { useState/* , useEffect */ } from 'react';
// import ShopperContext from '../../context/ShopperContext';
// import formatCurrency from '../FormatCurrency';
import Papa from 'papaparse';
import ProductsCard from './ProductsCard';
import api from '../../services';
import { ProductsDivS } from './Style';

function MainComponent() {
  const [productsToRender, setProductsToRender] = useState([]);
  const [productsFromCsv, setProductsFromCsv] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      transformHeader: (header) => header.trim(),
      complete(results) {
        console.log('Resultados do Parse CSV:', results.data);
        setProductsFromCsv(results.data);
      },
    });
  };

  console.log('Produtos do CSV:', productsFromCsv);

  /* Função responsável por montar a nova requisição para enviar para a API (api.validateData) */
  const handleValidateData = async () => {
    // Transformar o preço para formato numérico
    const formattedProducts = productsFromCsv.map((product) => ({
      code: product.product_code,
      newPrice: product.new_price,
    }));

    // Montar a requisição
    const newOrder = {
      products: formattedProducts,
    };

    // Enviar para a API
    const result = await api.validateData(newOrder);
    if (result.error) {
      alert(result.message);
      return;
    }

    // Em caso de sucesso, salvar em setProductsToRender o resultado da requisição
    setProductsToRender(result);
  };

  /* Função responsável por montar a nova requisição para enviar para a API (api.updatePrices) */
  const handleUpdatePrices = async () => {
    // Montar a requisição
    const productsToUpdate = productsToRender.map((product) => ({
      code: product.code,
      newPrice: product.newPrice,
    }));

    const newOrder = {
      products: productsToUpdate,
    };

    // Enviar para a API
    const result = await api.updatePrices(newOrder);
    if (result.error) {
      alert(result.message);
      return;
    }

    // Em caso de sucesso, exibir a mensagem de retorno do backend e limpar os estados
    setMessage(result.message);
    setProductsFromCsv([]);
    setProductsToRender([]);
  };

  return (
    <div id="mainDiv">
      <ProductsDivS>
        <div id="tableSection">
          <h1>Detalhes dos Produtos:</h1>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço Atual</th>
                <th>Novo Preço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {productsToRender?.map((product) => (
                <ProductsCard
                  key={product.code}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
      </ProductsDivS>
      <div id="csvFile">
        {/* Div que receberá o arquivo CSV para nova precificação dos produtos */}
        <p>
          Selecione o arquivo CSV para nova precificação dos produtos:
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          onClick={() => setProductsToRender([])}
        />
      </div>
      <div id="validationBtn">
        {/* Botão para validar o conteúdo do arquivo no backend */}
        <button
          type="button"
          onClick={handleValidateData}
          disabled={productsFromCsv.length === 0 || productsToRender.length > 0}
        >
          VALIDAR
        </button>
      </div>
      <div id="updateBtn">
        {/* Botão para atualizar o conteúdo do arquivo no backend */}
        <button
          type="button"
          onClick={handleUpdatePrices}
          disabled={productsToRender.length === 0 || !productsToRender.every((product) => product.status[0] === 'OK')}
        >
          ATUALIZAR
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MainComponent;
