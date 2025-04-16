const joi = require('@hapi/joi');

const register = {
    body: Joi.object().key({
        email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
		name: Joi.string().required(),
		roleId: Joi.number().required(),
    })
}

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

module.exports = {
    register,
    login,
}