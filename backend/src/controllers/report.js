const db = require("../models");

const User = db.users;
const Test = db.tests;
const Variant = db.variants;
const Question = db.questions;
const Report = db.reports;

const reportSchema = require("../schema/report")

exports.getForMe = async (req, res) => {
	try {
		let query = req.query
		query = { where: Object.assign(query, { testUserId: req.user.id } )}
		const reports = await Report.findAll(query)
		return res.json({ ok: true, reports })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}

exports.getFromMe = async (req, res) => {
	try {
		let query = req.query
		query = { where: Object.assign(query, { userId: req.user.id } )}
		const reports = await Report.findAll(query)
		return res.json({ ok: true, reports })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}

exports.getByTestId = async (req, res) => {
	try {
		let query = req.query
		query = { where: Object.assign(query, { testId: req.params.testId } )}
		const reports = await Report.findAll(query)
		return res.json({ ok: true, reports })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}

exports.getById = async (req, res) => {
	try {
    const report = await Report.findByPk(req.params.reportId)
    if(!report) throw new Error("Report not found")
    return res.json({ ok: true, report })
  } catch (err) {
    return res.json({ ok: false, error: err.message })
  }
}

exports.create = async (req, res) => {
	try {
		const { value, error } = reportSchema.create.validate(req.body)
		if(error) throw new Error(error)

		const test = await Test.findByPk(req.params.testId)
		if(!test) throw new Error("Test not found")
		const report = await Report.create({
			title: value.title,
			userId: req.user.id,
			testId: test.id,
			testUserId: test.userId,
			content: value.content ? value.content : ""
		})
		return res.json({ ok: true, report })
	} catch (err) {
		return res.json({ ok:false, error: err.message })
	}
}

exports.updateByAuthor = async (req, res) => {
	try {
		const { value, error } = reportSchema.update.validate(req.body)
		if(error) throw new Error(error)
		const report = await Report.findOne({ where: { id: req.params.reportId, userId: req.user.id }})
		if(!report)  throw new Error("Report not found")
		await Report.update(value, { where: { id: report.id }})
		return res.json({ ok: true })
	} catch (err) {
		return res.json({ ok:false, error: err.message })
	}
}

exports.updateByTestAuthor = async (req, res) => {
	try {
		const { value, error } = reportSchema.updateByTestUser.validate(req.body)
		if(error) throw new Error(error)
		const report = await Report.findOne({ where: { id: req.params.reportId, testUserId: req.user.id }})
		if(!report) throw new Error("Report not found")
		report.status = value.status
		await report.save()
		return res.json({ ok:true })
	} catch (err) {
		return res.json({ ok:false, error: err.message })
	}
}

exports.remove = async (req, res) => {
	try {
		const report = await Report.findOne( { where: { id: req.params.reportId, userId: req.user.id } })
		if(!report) throw new Error("Report not found")
		await report.destroy()
		return res.json({ ok: true })
	} catch (err) {
		return res.json({ ok: false, error: err.message })
	}
}