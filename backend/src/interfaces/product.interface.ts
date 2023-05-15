export interface IBody {
  products: Array<{
    code: number;
    newPrice: number;
  }>;
}

export interface IProductUpdate {
  codigo: string;
  novoPreco: number;
}

export interface ProductsController {
  validateNewData(req: IBody): Promise<void>;
  updateProducts(req: IProductUpdate): Promise<void>;
}