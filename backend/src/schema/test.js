const Joi = require('joi');

const title = Joi.string().min(4).max(255)
const subject = Joi.string().min(4).max(255)
const difficulty = Joi.number().valid(1, 2, 3)

exports.create = Joi.object({
	title: title.required(), subject: subject.required(), difficulty: difficulty.required(),
})

exports.update = Joi.object({
	title, subject, difficulty
})