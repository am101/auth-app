const joi = require('@hapi/joi');
const Joi = require('@hapi/joi');

function registerValidation(data) {
	const schema = Joi.object({
		name: Joi.string().min(5).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	const validation = schema.validate(data);

	return validation;
}

function loginValidation(data) {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	const validation = schema.validate(data);

	return validation;
}

module.exports = { registerValidation, loginValidation };
