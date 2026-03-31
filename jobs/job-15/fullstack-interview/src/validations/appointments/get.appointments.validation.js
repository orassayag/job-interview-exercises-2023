import Joi from 'joi';

export default Joi.object({
  minScore: Joi.number().min(0).max(10)
    .required(),
  date: Joi.number().integer()
    .required(),
  specialty: Joi.string()
    .required(),
});
