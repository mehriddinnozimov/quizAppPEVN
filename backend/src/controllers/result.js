const db = require("../models");

const User = db.users;
const Test = db.tests;
const Variant = db.variants;
const Question = db.questions;
const Result = db.results;
const ResultHistory = db.result_histories

const resultSchema = require("../schema/result")

const resultValidator = (body) => {
	try {
		const value = {}
		if(!body.data || body.data.length == 0) throw new Error("Wrong Body")
		value.data = []
		body.data.forEach(item => {
			const dataResult = resultSchema.create.validate(item)
			if(dataResult.error) throw new Error(dataResult.error)
			value.data.push(dataResult.value)
		})
		return { value: value, error: null }
	} catch (err) {
		return { value: null, error: err }
	}
}

exports.getResultHistory = async (req, res) => {
	try {
		const result = await Result.findByPk(req.params.resultId)
		if(!result) throw new Error("Result not found")
		const resultHistory = await ResultHistory.findAll({ where: { resultId: result.dataValues.id } })
		if(!resultHistory) throw new Error("Result history not found")
		return res.json({ ok: true, resultHistory })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}

exports.getMe = async (req, res) => {
	try {
		let query = req.query
		query = { where: Object.assign(query, { userId: req.user.id } )}
		query.include = [{
			model: Test
		}]
		const results = await Result.findAll(query)
		return res.json({ ok: true, results })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}

}

exports.getByTestId = async (req, res) => {
	try {
		let query = req.query
		query = { where: Object.assign(query, { testId: req.params.testId } )}
		const results = await Result.findAll(query)
		return res.json({ ok: true, results })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}

exports.create = async (req, res) => {
	try {
		const { value, error } = resultValidator(req.body)
		if(error) throw new Error(error)
		const test = await Test.findByPk(req.params.testId)
		if(!test) throw new Error("Test not found")
		const questions = await Question.findAll({ where: { testId: test.id }, include: [{ model: Variant }] })
		// if(questions.length != value.data.length) throw new Error("Wrong Body")
		let numerator = 0
		value.data.forEach(item => {
			const question = questions.find(q => q.dataValues.id == item.questionId)
			const variant = question.variants.find(v => v.dataValues.id == item.variantId )
			if(variant.dataValues.isAnswer) numerator++

		})
		
		const result  =	await Result.create({
			testId: test.id,
			userId: req.user.id,
			numerator: numerator,
			denominator: value.data.length
		})

		value.data.forEach(async item => {
			const resultHistory = await ResultHistory.create({
				resultId: result.id,
				questionId: item.questionId,
				variantId: item.variantId
			})
		})

		return res.json({ ok: true })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}