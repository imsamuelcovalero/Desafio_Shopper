import * as joi from 'joi';

const ALL_FIELDS_MUST_BE_FILLED = '400|All fields must be filled';

const newDataSchema = joi.object({
  product_code: joi.string().required().min(3).messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
  }),
  new_price: joi.number().required().messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'number.base': '400|The new price must be a valid number',
  }),
});

export { newDataSchema };
