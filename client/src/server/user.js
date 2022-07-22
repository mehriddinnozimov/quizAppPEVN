import axios from 'axios'

const instance = axios.create({
  baseURL : 'http://localhost:8000/api/',
  headers: {
    'Content-Type': "application/json",
    timeout : 10000,
  }
});

export const getMe = async () => {
	const res = await instance({ method: 'get', url: 'users/me' })
	return res.data
}

export const getAll = async () => {
	const res = await instance({ method: 'get', url: 'users/' })
	return res.data
}

export const logout = async () => {
	const res = await instance({ method: 'get', url: 'users/me/logout' })
	return res.data
}

export const getById = async (id) => {
	const res = await instance({ method: 'get', url: 'users/'+id })
	return res.data
}

export const update = async (body) => {
	const res = await instance({ method: 'put', url: 'users/me', data: body })
	return res.data
}

export const updateAvatar = async (body) => {
	const res = await instance({ method: 'patch', url: 'users/me', data: body })
	return res.data
}

export const remove = async () => {
	const res = await instance({ method: 'delete', url: 'users/me' })
	return res.data
}