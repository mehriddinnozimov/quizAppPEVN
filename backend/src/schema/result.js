const Joi = require("joi")

exports.create = Joi.object({
	questionId: Joi.number().required(),
	variantId: Joi.number().required()
})