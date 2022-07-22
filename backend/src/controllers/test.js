const db = require("../models");

const User = db.users;
const Test = db.tests;
const Variant = db.variants;
const Question = db.questions;
const Result = db.results;

const testSchema = require("../schema/test")
const questionSchema = require("../schema/question")
const variantSchema = require("../schema/variant")

function questionValidator(body, status){
  try {
    let value = {}
    const questionResult = questionSchema[status].validate({ title: body.title })
    if(questionResult.error) throw new Error(questionResult.error)
    value = { ...questionResult.value }
    value.variants = []
    let isAnswerCount = 0
    if(body.variants && body.variants.length > 0) {
      body.variants.forEach((variant, variantIndex) => {
        if(variant.isAnswer) isAnswerCount++
        const variantResult = !variant.id ? variantSchema["create"].validate(variant) :  variantSchema["update"].validate(variant)
        if(variantResult.error) throw new Error(`Variant #${variantIndex+1}. ${variantResult.error}`)
        value.variants.push(variantResult.value)
        })
      if(isAnswerCount != 1) throw new Error("The number of correct answers should be one")
    }
    return { value, error: null }
  } catch (err) {
    return { value: null, error: err.message }
  }
}

function testValidator(body, status){
  try {
    let value = {}
    const testResult = testSchema[status].validate({ title: body.title, subject: body.subject, difficulty: body.difficulty })
    if(testResult.error) throw new Error(testResult.error)
    value = { ...testResult.value }
    value.questions = []
    if(body.questions && body.questions.length > 0) body.questions.forEach((question, index) => {
      const questionResult = questionSchema[status].validate({ title: question.title })
      if(questionResult.error) throw new Error(`Question #${index+1}. ${questionResult.error}`)
      const questionValue = questionResult.value
      questionValue.variants = []
      let isAnswerCount = 0
      if(question.variants.length > 1) {
        question.variants.forEach((variant, variantIndex) => {
          if(variant.isAnswer) isAnswerCount++

          const variantResult = variantSchema[status].validate({ value: variant.value, isAnswer: variant.isAnswer })
          if(variantResult.error) throw new Error(`Question #${index+1}. Variant #${variantIndex+1}. ${variantResult.error}`)
          questionValue.variants.push(variantResult.value)
        })
        if(isAnswerCount != 1) throw new Error(`Question #${index+1}. The number of correct answers should be one`)
      } else {
        throw new Error(`Question #${index+1}. At least 2 variants are allowed`)
      }
      value.questions.push(questionValue)
    })

    return {value: value, error: null}
  } catch (err) {
    return {value: null, error:err.message}
  }
}

exports.getTestsLength = async (req, res) => {
  const length = await Test.count()
  return res.json({ ok: true, length })
}

exports.getAll =  async (req, res) => {
  let query = {}
  if(req.query) {
    query.limit = req.query.limit
    query.offset = req.query.offset * query.limit
    delete req.query.limit
    delete req.query.offset

    query.where = req.query
  }

  query.include = [
    {
      model: User
    }, {
      model: Question,
      include: [{
        model: Variant,
      }]
    }
  ]
  const tests = await Test.findAll(query)
  return res.json({ ok: true, tests })
}

exports.getMe = async (req, res) => {
  try {
    let query = {}
    if(req.query) query = { where: { ...req.query, userId: req.user.id } }
    query.include = [{
      model: Question,
      include: [{
        model: Variant
      }]
    }]
    const tests = await Test.findAll(query)
    return res.json({ok:true, tests})
  } catch (err) {
    return res.json({ok: false, error: err.message})
  } 
}

exports.getById = async (req, res) => {
  try {
    const query = {where: { id: req.params.testId }}
    query.include = [{
      model: User
    },{
      model: Question,
      include: [{
        model: Variant
      }]
    }]
    const test = await Test.findOne(query)
    if(!test) throw new Error("Test not found")
    return res.json({ ok: true, test })
  } catch (err) {
    return res.json({ ok: false, error: err.message })
  }
}

exports.getByUserId = async (req, res) => {
  try {
    const query = {where: { user: req.params.userId }}
    query.include = [{
      model: User
    },{
      model: Question,
      include: [{
        model: Variant
      }]
    }]
    const tests = await Test.findAll(query)
    return res.json({ ok: true, tests })
  } catch (err) {
    return res.json({ ok: false, error: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const {  value, error } = testValidator(req.body, 'create')
    if(error) throw new Error(error)
    const test = await Test.create({
      title: value.title,
      subject: value.subject,
      difficulty: value.difficulty,
      userId: req.user.id
    })
    value.questions.forEach(async (item) => {
      const question = await Question.create({
        title: item.title,
        testId: test.dataValues.id
      })
      item.variants.forEach(async (insideItem) => {
        const variant = await Variant.create({
          value: insideItem.value,
          isAnswer: insideItem.isAnswer,
          questionId: question.dataValues.id
        })
      })
    })
    return res.json({ ok: true })
  } catch (err) {
    return res.json({ ok: false, error: err.message })
  }
}

exports.createQuestion = async (req, res) => {
  try {
    const { value, error } = questionValidator(req.body, 'create')
    if(error) throw new Error(error)
    const test = await Test.findOne({ where: { id: req.params.testId } })
    if(!test) throw new Error("Test not found")
    const question = await Question.create({
      title: value.title,
      testId: test.dataValues.id
    })
    value.variants.forEach(async item => {
      const variant = await Variant.create({
        value: item.value,
        isAnswer: item.isAnswer,
        questionId: question.dataValues.id
      })
    })

    return res.json({ ok:true })
  } catch (err) {
    return res.json({ ok: false, error: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const { value, error } = testSchema.update.validate(req.body, 'update')
    if(error) throw new Error(error)
    let test = await Test.findByPk(req.params.testId)
    if(!test) throw new Error("Test not found")
    if(test.dataValues.userId != req.user.id) throw new Error("Permission denied")
    test = await Test.update(value, { where: { id: test.dataValues.id }})
    return res.json({ ok: true })
  } catch (err) {
    return res.json({ok: false, error: err.message})
  }
}

exports.updateQuestion = async (req, res) => {
  try {
    const { value, error } = questionValidator(req.body, 'update')
    if(error) throw new Error(error)
    let test = await Test.findByPk(req.params.testId)
    if(!test) throw new Error("Test not found")
    if(test.dataValues.userId != req.user.id) throw new Error("Permission denied")
    const results = await Result.findAll({ where: { testId: test.id } })
    if(results.length > 0) throw new Error("You cannot change this test because changing this test will affect the results")
    const question = await Question.findByPk(req.params.questionId)
    if(!question) throw new Error("Question not found")
    await Question.update({
      title: value.title
    }, { where: { id: question.dataValues.id } })
    if(value.variants && value.variants?.length > 0) {
      const variants = await Variant.findAll({ where: { questionId: question.dataValues.id } })
      const deleted = getDeletedId(variants, value.variants)
      if(deleted.length > 0){
        deleted.forEach(async del => {
          await Variant.destroy( { where: { id: del.id } } )
        })
      }
      value.variants.forEach(async (item, i) => {
        if(item.id){
          await Variant.update({
            value: item.value,
            isAnswer: item.isAnswer,
            questionId: question.dataValues.id
          }, { where: { id: item.id, questionId: question.id }})       
        } else {
          await Variant.create({ value: item.value, isAnswer: item.isAnswer, questionId: question.dataValues.id })
        }
      })
    }

    return res.json({ ok: true })
  } catch (err) {
    return res.json({ ok: false, error: err.message})
  }
}


exports.remove = async (req, res) => {
  try {
    let test = await Test.findByPk(req.params.testId)
    if(!test) throw new Error("Test not found")
    if(test.dataValues.userId != req.user.id) throw new Error("Permission denied")
    await test.destroy()
    return res.json({ ok: true })
  } catch (err) {
    return res.json({ ok:false, error: err.message })
  }
}

exports.removeQuestion = async (req, res) => {
  try {
    let test = await Test.findByPk(req.params.testId)
    if(!test) throw new Error("Test not found")
    if(test.dataValues.userId != req.user.id) throw new Error("Permission denied")
    await Question.destroy({ where: { id: req.params.questionId, testId: test.dataValues.id } })
    return res.json({ ok: true })
  } catch (err) {
    return res.json({ ok:false, error: err.message })
  }
}


function getDeletedId(o, n){
  const deleted = o.filter(a => {
    return n.findIndex(v => v.id == a.id) < 0
  })
  return deleted
}
