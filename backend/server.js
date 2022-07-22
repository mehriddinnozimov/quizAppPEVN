require('dotenv').config({ path: './src/config/.env' })
const db = require("./src/db/sequalize")

const http = require("http")
const app = require("./app")

const server = http.createServer(app)

const port = process.env.PORT
server.listen(port, () => {
		db()
    console.log(`http://localhost:${port}`)
})