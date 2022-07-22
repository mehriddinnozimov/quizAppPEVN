const express = require("express")
const app = express()

const path = require("path")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const cookieSession = require("cookie-session")
const cors = require("cors")
const passport = require("./src/middleware/passport")

app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data: blob:"],
    },
  })
);

app.use(cors({
	origin: "http://localhost:8080"
}))

app.use(cookieSession({
	name: 'session',
	maxAge: 24 * 60 * 60 * 1000,
	keys: [process.env.COOKIE_SECRET_N1, process.env.COOKIE_SECRET_N2]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '/src/statics')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use("/api/users", require("./src/routes/user"))
app.use("/auth", require("./src/routes/auth"))
app.use("/api/tests", require("./src/routes/test"))
app.use("/api/reports", require("./src/routes/report"))
app.use("/api/results", require("./src/routes/result"))
// app.use("/api/admin", require("./src/routes/admin"))


module.exports = app