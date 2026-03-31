import Joi from 'joi';

export default Joi.object({
  name: Joi.string()
    .required(),
  date: Joi.number().integer()
    .required(),
});
