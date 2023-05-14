import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import validators from '../middlewares/validators';

const router = Router();

const productsController = new ProductsController();

router.post('/', validators.validateNewData, productsController.verifyNewData);
router.patch('/', productsController.updateProducts);

export default router;
