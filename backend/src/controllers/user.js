const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op

const userSchema = require("../schema/user")

exports.getAll =  async (req, res) => {
    try {
        let query = {}
        if(req.query) query = { where: req.query }
        const users = await User.findAll(query)
        return res.json({ ok: true, users })
    } catch (err) {
        return res.json({ ok:false, error: err.message})
    }
}

exports.getMe =  async (req, res) => {
    try {
        return res.json({ ok:true, user: req.user })
    } catch (err) {
        return res.json({ ok:false, error: err.message})
    }
}

exports.getById =  async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(!user) throw new Error("User not found!");

        return res.json({ ok: true, user })
    } catch (err) {
        return res.json({ ok:false, error: err.message})
    }
    
}

exports.update =  async (req, res) => {
    try {
        const { value, error } = userSchema.update.validate(req.body)
        if(error) throw new Error(error)
        await User.update(value, { where: { id: req.user.id } })

        return res.json({ ok: true })
    } catch (err) {
        return res.json({ ok:false, error: err.message})
        
    }
}

exports.updateAvatar = async (req, res) => {
    try {
        const { value, error } = userSchema.updateAvatar.validate(req.body)
        if(error) throw new Error(error)
        req.user.avatar = value.url
        await req.user.save()
        return res.json({ ok: true })
    } catch (err) {
        return res.json({ ok: false, error: err.message })
    }
}

exports.remove =  async (req, res) => {
    try {
        await req.user.destroy()
        return res.json({ ok: true })
    } catch (err) {
        return res.json({ ok:false, error: err.message})
    }
}

exports.logout = (req, res) => {
    req.logout()
    return res.json({ ok: true })
}
