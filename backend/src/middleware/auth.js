module.exports = (req, res, done) => {
	if(!req.user) return res.json({ok: false, error: "User not logged in"})
	done()
}

// const db = require("../models");
// const User = db.users;
// const Op = db.Sequelize.Op

// module.exports = async (req, res, done) => {
// 	req.user  = await User.findByPk(1)
// 	done()
// }