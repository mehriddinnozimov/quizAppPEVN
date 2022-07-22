const Joi = require('joi');

const title = Joi.string().min(4).max(255)

exports.create = Joi.object({
	title: title.required()
})

exports.update = Joi.object({
	title
})