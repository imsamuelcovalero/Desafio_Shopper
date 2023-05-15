import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';
import { newDataSchema } from './joySchema';
// import { IGetUserAuthInfoRequest } from '../interfaces/decoded.interface';

const validators = {
  validateNewData(req: Request, _res: Response, next: NextFunction) {
    console.log('validateLogin', req.body);

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
