import Joi from 'joi';

export default Joi.object().keys({
  page: Joi.number().required(),
  limit: Joi.number().required(),
});
