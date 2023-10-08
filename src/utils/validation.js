const Joi = require("@hapi/joi");

const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    mobile: Joi.string().min(10).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const subAdminValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    mobile: Joi.string().min(10).required(),
    role: Joi.number().required(),
    id : Joi.required()
  });

  return schema.validate(data);
};



module.exports = {
  subAdminValidation,
  loginValidation,
  registrationValidation,
};
