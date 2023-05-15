import { IBody, IProductUpdate, IProduct, IProductData } from '../interfaces/product.interface';
import ProductModel from '../database/models/product.model';
import PackModel from '../database/models/pack.model';
import CustomError from '../errors/CustomError';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  private checkPriceAdjustment(parsedNewPrice: number, salesPrice: number, code: number, productData: IProductData): void {
    const priceDifference = parsedNewPrice - salesPrice;

    if (priceDifference < -salesPrice * 0.1 || priceDifference > salesPrice * 0.1) {
      productData.status.push('Reajuste inválido para o produto');
    }
  }

  private checkSalesPrice(parsedNewPrice: number, costPrice: number, code: number, productData: IProductData): void {
    if (parsedNewPrice < costPrice) {
      productData.status.push('Preço de venda abaixo do custo para o produto');
    }
  }

  private checkProductExists(existingProduct: IProduct | null, code: number, productData: IProductData): void {
    if (!existingProduct) {
      productData.status.push('Produto com código ${code} não encontrado');
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

  validateNewData = async (body: IBody): Promise<Array<IProductData>> => {
    const { products } = body;

    const validatedData = [];

    for (const product of products) {
      const { code, newPrice } = product;

      // Verificar se o código do produto existe
      const existingProduct = await ProductModel.findOne({ where: { code } });

      if (!existingProduct) {
        const productData: IProductData = {
          codigo: code,
          nome: 'Desconhecido',
          precoAtual: 0,
          novoPreco: newPrice,
          status: ['Produto não encontrado'],
        } as IProductData;

        validatedData.push(productData);
        continue; // Ir para a próxima iteração do loop
      }

      const { salesPrice, costPrice } = existingProduct;

      const parsedNewPrice = parseFloat(String(newPrice));

      const productData: IProductData = {
        codigo: code,
        nome: existingProduct.name,
        precoAtual: salesPrice,
        novoPreco: parsedNewPrice,
        status: [],
      } as IProductData;

      // Verificar se o novo preço respeita as regras de negócio
      this.checkProductExists(existingProduct, code, productData);
      this.checkPriceAdjustment(parsedNewPrice, salesPrice, code, productData);
      this.checkSalesPrice(parsedNewPrice, costPrice, code, productData);

      // Aqui deve ser verificada a regra de negócios para pacotes
      if (code.toString().length === 4) {
        // Procura na PackModel quais são os itens que compõem o pacote e as quantidades
        const packItems = await PackModel.findAll({ where: { packId: code } });

        let sumOfItemPrices = 0;
        for (const item of packItems) {
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
        // Aqui deve ser verificada a regra de negócios para componentes
      } else {
        // Procurar todos os pacotes que incluem este produto
        const includedInPacks = await PackModel.findAll({ where: { productId: code } });

        for (const pack of includedInPacks) {
          // Verificar se o pacote está na lista de produtos com novos preços
          const newPricePack = products.find(prod => prod.code === pack.packId);
          if (!newPricePack) {
            throw new CustomError(400, `Pacote com código ${pack.packId} que inclui o produto ${code} não está presente na lista de novos preços`);
          }

          // Procurar todos os produtos que fazem parte deste pacote
          const packItems = await PackModel.findAll({ where: { packId: pack.packId } });

          let sumOfItemPrices = 0;
          for (const item of packItems) {
            // Verificar se o produto está na lista de produtos com novos preços
            const newPriceProduct = products.find(prod => prod.code === item.productId);

            if (newPriceProduct) {
              // Se o novo preço do produto estiver presente, use-o, caso contrário, use o preço antigo
              sumOfItemPrices += newPriceProduct.newPrice * item.qty
            } else {
              const productDetails = await ProductModel.findOne({ where: { code: item.productId } });
              if (productDetails) {
                sumOfItemPrices += productDetails.salesPrice * item.qty;
              } else {
                throw new CustomError(400, `Produto com código ${item.productId} não encontrado`);
              }
            }
          }

          if (newPricePack.newPrice !== sumOfItemPrices) {
            throw new CustomError(400, `O preço do pacote de código ${pack.packId} não é igual à soma dos preços dos itens que o compõem`);
          }
        }

        if (productData.status.length === 0) {
          productData.status.push('OK');
        }
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
