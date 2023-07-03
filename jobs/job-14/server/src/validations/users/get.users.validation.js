import Joi from 'joi';

export default Joi.object({
  pageNumber: Joi.number().integer().min(1).max(10)
    .required(),
  pageSize: Joi.number().integer().min(1).max(100)
    .required(),
  sortBy: Joi.string()
    .required(),
  sortOrder: Joi.string().valid('asc', 'desc')
    .required(),
});
