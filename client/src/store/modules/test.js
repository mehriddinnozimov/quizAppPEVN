import { getTestLength, getAllWithPage, getMyTests, create, getById, remove, update, createQuestion, updateQuestion, removeQuestion } from '../../server/test'

function getDeletedId(o, n){
	const deleted = o.filter(a => {
		return n.findIndex(v => v.id == a.id) < 0
	})
	return deleted
}


export default {
	namespaced: true,
	state(){ return {
		myTests: [],
		test: null,
		tempTest: null,
		tests: [],
		page: 0,
		pageLimit: 0,

	} },
	actions: {
		incrasePage(_){
			if(_.state.pageLimit > _.state.page + 1){
				_.commit("setPage", 1)
				_.dispatch("getTests", _.state.page)				
			}
		},
		decrasePage(_){
			if(_.state.page != 0) {
				_.commit("setPage", -1)
				_.dispatch("getTests", _.state.page)
			}
		},
		async getLength(_){
			const data = await getTestLength()
			if(data.ok){
				_.commit("setPageLimit", Math.ceil(data.length / 4))
			}
		},
		async getTests(_, page){
			const data = await getAllWithPage(page)
			if(data.ok) {
				_.commit("setTests", data.tests)
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		},
		async getMyTests(_){
			const data = await getMyTests()
			if(data.ok){
				_.commit("setMyTests", data.tests)
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		},
		async createTest(_, { body, onSuccess }){
			const data = await create(body)
			if(data.ok){
				_.dispatch("getMyTests")
				_.dispatch("toast/success", "Test created", { root: true })
				onSuccess()
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		},
		async getTestById(_, testId){
			const data = await getById(testId)
			if(data.ok){
				_.commit("setTest", data.test)
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		},
		async updateTest(_, { body, onSuccess  }){
			try {
				const test = {
					title: body.title,
					subject: body.subject,
					difficulty: body.difficulty
				}
				const testData = await update(body.id, test)
				if(!testData.ok) throw new Error(testData.error)

				const deleted = getDeletedId(_.state.tempTest.questions, body.questions)
				deleted.map(async del => {
					const questionData = await removeQuestion(body.id, del.id)
					if(!questionData.ok) throw new Error(questionData.error)
				})				
				body.questions.map(async q => {
					const question = {
						title: q.title
					}
					question.variants = q.variants.map(variant => {
						const v = {
							value: variant.value,
							isAnswer: variant.isAnswer
						}
						if(variant.id) v.id = variant.id
						return v
					})
					if(q.id){
						const i = _.state.tempTest.questions.findIndex(a => a.id == q.id)
						if(i > -1){
							const questionData = await updateQuestion(body.id, q.id, question)
							if(!questionData.ok) throw new Error(questionData.error)
						}
					} else {
						const questionData = await createQuestion(body.id, question)
						if(!questionData.ok) throw new Error(questionData.error)
					}
				})
				_.dispatch("toast/success", "Test updated", { root: true })
				_.dispatch("getTestById", body.id)
				onSuccess()
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}
		},
		async removeById(_, testId){
			const data = await remove(testId)
			if(data.ok){
				_.dispatch("getMyTests")
				_.dispatch("toast/success", "Test Removed!", {root: true})
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		}
	},
	getters: {
		getTestsInfoForTable(state){
			const testForTable = {}
			if(state.myTests.length > 0) {
				testForTable.body = state.myTests.map(tests => {
					const temp = {...tests}
					const date = new Date(temp.createdAt).toDateString()
					delete temp.updatedAt 
					delete temp.userId
					delete temp.createdAt
					delete temp.questions
					temp.title = { t: temp.title, l: "/tests/"+temp.id }
					temp.subject = { t: temp.subject }
					temp.difficulty = { t: temp.difficulty }
					temp.created = { t: date }
					return temp
				})
			}
			testForTable.heads = [{t:"ID", k: 'id'}, {t:"Title", k: 'title'}, {t:"Subject", k: 'subject'}, {t:"Difficulty", k: 'difficulty'}, {t:"Created", k: 'created'}]
			console.log(testForTable)
			return testForTable
		},
		getTest(state){
			return state.test
		}
	},
	mutations: {
		setMyTests(state, tests){
			state.myTests = tests
		},
		setTest(state, test){
			state.test = test
			state.tempTest = JSON.parse(JSON.stringify(test))
		},
		setTests(state, tests){
			state.tests = tests
		},
		setPage(state, num){
			state.page = state.page + num
		},
		setPageLimit(state, limit){
			state.pageLimit = limit
		}
	}
}