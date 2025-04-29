const Joi = require("@hapi/joi");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};

module.exports = {
  register,
  login,
};
