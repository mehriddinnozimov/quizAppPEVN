const passport = require("passport")
const { Strategy } = require("passport-google-oauth20")

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op

passport.use(new Strategy({
	callbackURL: "/auth/google/callback",
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
	const user = await User.findOrCreate({
		where: { email: profile._json.email },
		defaults: {
			firstName: profile._json.name,
			avatar: profile._json.picture
		}
	})
	done(null, user[0].dataValues)
}))

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findByPk(id)
	if(!user) return done("You are not logged in", null)
	done(null, user?.dataValues)
})



module.exports = passport