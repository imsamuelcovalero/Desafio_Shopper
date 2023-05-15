import { IBody, IProductUpdate, IProductData } from '../interfaces/product.interface';
import ProductModel from '../database/models/product.model';
import PackModel from '../database/models/pack.model';
import CustomError from '../errors/CustomError';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  // função que valida newPrice para verificar se é um valor numérico valido
  private validateNewPrice(newPrice: number, productData: IProductData): number {
    const parsedNewPrice = parseFloat(String(newPrice));
    if (isNaN(parsedNewPrice)) {
      productData.status.push('O novo preço deve ser um número válido');
    }
    productData.novoPreco = parsedNewPrice;
    return parsedNewPrice;
  }

  private checkPriceAdjustment(parsedNewPrice: number, salesPrice: number, productData: IProductData): void {
    const priceDifference = parsedNewPrice - salesPrice;

    if (priceDifference < -salesPrice * 0.1 || priceDifference > salesPrice * 0.1) {
      productData.status.push('Reajuste inválido para o produto');
    }
  }

  private checkSalesPrice(parsedNewPrice: number, costPrice: number, productData: IProductData): void {
    if (parsedNewPrice < costPrice) {
      productData.status.push('Preço de venda abaixo do custo para o produto');
    }
  }

  private async checkPackageRules(code: number, products: IProductUpdate[], parsedNewPrice: number, productData: IProductData): Promise<void> {
    const packItems = await PackModel.findAll({ where: { packId: code } });

    let sumOfItemPrices = 0;
    for (const item of packItems) {
      const newPriceProduct = products.find(prod => prod.code === item.productId);
      if (!newPriceProduct) {
        productData.status.push(`Produto com código ${item.productId} que faz parte do pacote ${code} não está presente na lista de novos preços`);
        continue;
      }

      sumOfItemPrices += newPriceProduct.newPrice * item.qty;
    }

    if (parsedNewPrice !== sumOfItemPrices) {
      productData.status.push(`O preço do pacote de código ${code} não é igual à soma dos preços dos itens que o compõem`);
    }
  }

  private async checkComponentRules(code: number, products: IProductUpdate[], productData: IProductData): Promise<void> {
    const includedInPacks = await PackModel.findAll({ where: { productId: code } });

    for (const pack of includedInPacks) {
      const newPricePack = products.find(prod => prod.code === pack.packId);
      if (!newPricePack) {
        productData.status.push(`Pacote com código ${pack.packId} que inclui o produto ${code} não está presente na lista de novos preços`);
        continue;
      }

      const packItems = await PackModel.findAll({ where: { packId: pack.packId } });

      let sumOfItemPrices = 0;
      for (const item of packItems) {
        const newPriceProduct = products.find(prod => prod.code === item.productId);

        if (newPriceProduct) {
          sumOfItemPrices += newPriceProduct.newPrice * item.qty;
        } else {
          const productDetails = await ProductModel.findOne({ where: { code: item.productId } });
          if (productDetails) {
            sumOfItemPrices += productDetails.salesPrice * item.qty;
          } else {
            productData.status.push(`Produto com código ${item.productId} não encontrado`);
          }
        }
      }

      if (newPricePack.newPrice !== sumOfItemPrices) {
        productData.status.push(`O preço do pacote de código ${pack.packId} não é igual à soma dos preços dos itens que o compõem`);
      }
    }
  }

  validateNewData = async (body: IBody): Promise<Array<IProductData>> => {
    const { products } = body;

    const validatedData = [];

    for (const product of products) {
      const { code, newPrice } = product;

      // Verificar se o código do produto existe
      const existingProduct = await ProductModel.findOne({ where: { code } });

      // Se não existir, adicionar o produto com status de erro e ir para o próximo
      if (!existingProduct) {
        const productData: IProductData = {
          codigo: code,
          nome: 'Desconhecido',
          precoAtual: 0,
          novoPreco: newPrice,
          status: ['Produto com código ${code} não encontrado'],
        } as IProductData;

        validatedData.push(productData);
        continue; // Ir para a próxima iteração do loop
      }

      const { salesPrice, costPrice } = existingProduct;

      const productData: IProductData = {
        codigo: code,
        nome: existingProduct.name,
        precoAtual: salesPrice,
        novoPreco: newPrice,
        status: [],
      } as IProductData;

      const parsedNewPrice = this.validateNewPrice(newPrice, productData);

      // Verifica se o novo preço respeita as regras de negócio
      this.checkPriceAdjustment(parsedNewPrice, salesPrice, productData);
      this.checkSalesPrice(parsedNewPrice, costPrice, productData);

      // Verifica se o a regra de negócio para pacotes foi respeitada
      if (code.toString().length === 4) {
        await this.checkPackageRules(code, products, parsedNewPrice, productData);
        // Verifica se o a regra de negócio para componentes foi respeitada
      } else {
        await this.checkComponentRules(code, products, productData);
      }

      if (productData.status.length === 0) {
        productData.status.push('OK');
      }

      validatedData.push(productData);
    }

    return validatedData;
  };

  updateProducts = async (body: IProductUpdate[]): Promise<string> => {
    for (const product of body) {
      const { code, newPrice } = product;

      // Encontrar o produto existente
      const existingProduct = await ProductModel.findOne({ where: { code } });

      if (existingProduct === null) {
        throw new CustomError(404, `Produto com o código ${code} não encontrado`);
      }

      // Atualizar o preço de venda do produto
      existingProduct.salesPrice = newPrice;

      // Salvar o produto com o novo preço
      await existingProduct.save();
    }

    return 'Preços atualizados com sucesso. Novo arquivo pode ser enviado para verificação';
  };
}
