import * as joi from 'joi';

const ALL_FIELDS_MUST_BE_FILLED = '400|All fields must be filled';

const productSchema = joi.object({
  code: joi.number().required().messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
  }),
  newPrice: joi.number().required().messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
  }),
});

const newDataSchema = joi.object({
  products: joi.array().items(productSchema)
});

export { newDataSchema };
