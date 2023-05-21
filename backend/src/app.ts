import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import productsRoute from './routers/products.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.use(cors());

    this.app.use('/products', productsRoute);
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
export const { app } = new App();
