import { IBody, IProductUpdate } from '../interfaces/product.interface';
import ProductModel from '../database/models/product.model';
import PackModel from '../database/models/pack.model';
import CustomError from '../errors/CustomError';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  validateNewData = async (body: IBody): Promise<Array<object>> => {
    const { products } = body;

    const validatedData = [];

    for (const product of products) {
      const { code, newPrice } = product;

      // Verificar se o código do produto existe
      const existingProduct = await ProductModel.findOne({ where: { code } });
      if (!existingProduct) {
        throw new CustomError(400, `Produto com código ${code} não encontrado`);
      }

      const { salesPrice, costPrice } = existingProduct;

      const parsedNewPrice = parseFloat(String(newPrice));

      // Verificar se o novo preço respeita as regras de negócio
      const priceDifference = parsedNewPrice - salesPrice;

      if (priceDifference < -salesPrice * 0.1 || priceDifference > salesPrice * 0.1) {
        throw new CustomError(400, `Reajuste inválido para o produto de código ${code}`);
      }

      if (parsedNewPrice < costPrice) {
        throw new CustomError(400, `Preço de venda abaixo do custo para o produto de código ${code}`);
      }

      // Aqui deve ser verificada a regra de negócios para pacotes
      if (code.toString().length === 4) {
        // Procura na PackModel quais são os itens que compõem o pacote e as quantidades
        const packItems = await PackModel.findAll({ where: { packId: code } });

        let sumOfItemPrices = 0;
        for (const item of packItems) {
          const product = await ProductModel.findOne({ where: { code: item.productId } });
          if (!product) {
            throw new CustomError(400, `Produto com código ${item.productId} não encontrado no pacote ${code}`);
          }

          // Verifica se o produto está na lista de produtos com novos preços
          const newPriceProduct = products.find(prod => prod.code === item.productId);
          if (!newPriceProduct) {
            throw new CustomError(400, `Produto com código ${item.productId} que faz parte do pacote ${code} não está presente na lista de novos preços`);
          }

          sumOfItemPrices += newPriceProduct.newPrice * item.qty;
        }

        if (parsedNewPrice !== sumOfItemPrices) {
          throw new CustomError(400, `O preço do pacote de código ${code} não é igual à soma dos preços dos itens que o compõem`);
        }
      }

      validatedData.push({
        codigo: code,
        nome: existingProduct.name,
        precoAtual: salesPrice,
        novoPreco: parsedNewPrice,
      });
    }

    return validatedData;
  };

  updateProducts = async (body: IProductUpdate[]): Promise<string> => {
    for (const product of body) {
      const { codigo, novoPreco } = product;

      // Encontrar o produto existente
      const existingProduct = await ProductModel.findOne({ where: { code: codigo } });

      if (existingProduct === null) {
        throw new CustomError(404, `Produto com o código ${codigo} não encontrado`);
      }

      // Atualizar o preço de venda do produto
      existingProduct.salesPrice = novoPreco;

      // Salvar o produto com o novo preço
      await existingProduct.save();
    }

    return 'Preços atualizados com sucesso. Novo arquivo pode ser enviado para verificação';
  };
}
