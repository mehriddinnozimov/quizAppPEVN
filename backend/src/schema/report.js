const Joi = require('joi');

const title = Joi.string().min(4).max(255)
const content = Joi.string().min(4).max(1000)

exports.create = Joi.object({
	title: title.required(), content
})

exports.update = Joi.object({
	title, content
})

exports.updateByTestUser = Joi.object({
	status: Joi.string().valid("accepted").required()
})