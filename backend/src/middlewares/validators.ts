import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';
import { newDataSchema } from './joySchema';

const validators = {
  validateNewData(req: Request, _res: Response, next: NextFunction) {
    console.log('validateBody', req.body);

    const schema = newDataSchema;
    const { error } = schema.validate(req.body);

    if (error) {
      console.log('erro', error.message);
      const [status, message] = error.message.split('|');
      throw new CustomError(status, message);
    }

    next();
  },
};

export default validators;
