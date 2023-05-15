import { Request, Response } from 'express';
import ProductsService from '../services/products.service';

class ProductsController {
  constructor(private productsService = new ProductsService()) { }

  validateNewData = async (req: Request, res: Response) => {
    const result = await this.productsService.validateNewData(req.body);

    res.status(200).json(result);
  };

  updateProducts = async (req: Request, res: Response) => {
    const result = await this.productsService.updateProducts(req.body);

    res.status(200).json(result);
  };
}

export default ProductsController;
