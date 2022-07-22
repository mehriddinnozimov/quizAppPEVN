import axios from 'axios'

const instance = axios.create({
  baseURL : 'http://localhost:8000/api/',
  headers: {
    'Content-Type': "application/json",
    timeout : 10000,
  }
});


export const create = async (testId, body) => {
	const res = await instance({ method: 'post', url: `results/tests/${testId}/`, data: { data: body} })
	return res.data
}

export const getMe = async () => {
	const res = await instance({ method: 'get', url: 'results/'})
	return res.data
}

export const getResultHistory = async (resultId) => {
	const res = await instance({ method: 'get', url: `results/${resultId}` })
	return res.data
}

export const getByTestId = async (testId) => {
	const res = await instance({ method: 'get', url: `results/tests/${testid}` })
	return res.data
}