const Joi = require('joi');

exports.update = Joi.object({
	firstName: Joi.string().min(2).max(20),
	lastName: Joi.string().min(2).max(30),
	info: Joi.string().max(300)
})

exports.updateAvatar = Joi.object({
	url: Joi.string().uri().required()
})