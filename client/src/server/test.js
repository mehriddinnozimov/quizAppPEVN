import axios from 'axios'

const instance = axios.create({
  baseURL : 'http://localhost:8000/api/',
  headers: {
    'Content-Type': "application/json",
    timeout : 10000,
  }
});

export const getMyTests = async () => {
	const res = await instance({ method: 'get', url: 'tests/me' })
	return res.data
}
export const getTestLength = async () => {
	const res = await instance({ method: 'get', url: 'tests/count' })
	return res.data
}
export const getAll = async () => {
	const res = await instance({ method: 'get', url: 'tests/' })
	return res.data
}

export const getAllWithPage = async (page) => {
	const res = await instance({ method: 'get', url: 'tests/', params: { offset: page, limit: 4 } })
	return res.data
}

export const getById = async (id) => {
	const res = await instance({ method: 'get', url: 'tests/' + id })
	return res.data
}

export const create = async (body) => {
	const res = await instance({ method: 'post', url: 'tests/add', data: body })
	return res.data
}

export const createQuestion = async (testId, body) => {
	const res = await instance({ method: 'post', url: `tests/${testId}/add`, data: body })
	return res.data
}

export const update = async (id, body) => {
	const res = await instance({ method: 'put', url: `tests/${id}`, data: body })
	return res.data
}

export const updateQuestion = async (testId, questionId, body) => {
	const res = await instance({ method: 'put', url: `tests/${testId}/${questionId}`, data: body })
	return res.data
}

export const remove = async (id) => {
	const res = await instance({ method: 'delete', url: 'tests/' + id })
	return res.data
}

export const removeQuestion = async (testId, questionId) => {
	const res = await instance({ method: 'delete', url: `tests/${testId}/${questionId}` })
	return res.data
}