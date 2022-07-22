const Joi = require('joi');

const value = Joi.string().max(300)
const isAnswer = Joi.boolean()

exports.create = Joi.object({
	value: value.required(),
	isAnswer
})

exports.update = Joi.object({
	id: Joi.number(),
	value, isAnswer
})