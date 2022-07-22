import { create, getMe } from '../../server/result'

export default {
	namespaced: true,
	state(){ return {
		myResults: []
	}},
	actions: {
		async createResult(_, {testId, answers, onSuccess}){
			const data = await create(testId, answers)
			if(data.ok){
				_.dispatch("toast/success", "Check your result on the Profile/My Results page", {root: true})
			onSuccess()
			} else {
				_.dispatch("toast/error", data.error, {root: true})
			}
		},
		async getMyResults(_){
			const data = await getMe()
			if(data.ok) {
				_.commit("setMyResults", data.results)
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		}
	},
	mutations: {
		setMyResults(state, results){
			state.myResults = results
		}
	},
	getters: {
		getResultsInfoForTable(state){
			const resultsForTable = {}
			if(state.myResults.length > 0){
				resultsForTable.body = state.myResults.map(result => {
					const temp = {...result}
					const date = new Date(temp.createdAt).toDateString()
					delete temp.updatedAt 
					delete temp.userId
					delete temp.createdAt
					delete temp.testId
					delete temp.test
					temp.title = { t: result.test.title, l: "/tests/"+result.test.id }
					temp.numerator = { t: result.numerator }
					temp.denominator = { t: result.denominator }
					temp.percentage = { t: `${(result.numerator / result.denominator) * 100}%` }
					temp.created = { t: date }
					return temp
				})
				resultsForTable.heads = [{t: "ID", k: 'id'}, {t: "Test Title", k: 'title'}, {t: "Numerator", k: 'numerator'}, {t: "Denominator", k: 'denominator'}, {t: "Percentage", k: 'percentage'}, {t: "Solved Date", k: 'created'}]
			}
			console.log(resultsForTable)
			return resultsForTable
		}
	}
}