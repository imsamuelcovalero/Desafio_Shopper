export interface IBody {
  products: Array<IProductUpdate>;
}

// cria uma interface para os produtos que chegam pelo body, possuindo code e newPrice
export interface IProductUpdate {
  code: number;
  newPrice: number;
}

export interface ProductsController {
  validateNewData(req: IBody): Promise<void>;
  updateProducts(req: IProductUpdate): Promise<void>;
}

export interface IProduct {
  code: number;
  name: string;
  costPrice: number;
  salesPrice: number;
}

export interface IProductData {
  code: number;
  name: string;
  currentPrice: number;
  newPrice: number;
  status: string[];
}