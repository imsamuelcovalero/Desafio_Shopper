// eslint-disable-next-line import/extensions
import api from './baseUrl.js';

/*
    ** Api functions
*/

/* função axios que envia os itens a serem validados pelo backend */
async function validateData(requisition) {
  try {
    const result = await api.post('/products', { ...requisition });

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

/* função axios que envia os itens a serem atualizados para o banco de dados */
async function updatePrices(requisition) {
  try {
    const result = await api.patch('/products', { ...requisition });

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

export { validateData, updatePrices };
