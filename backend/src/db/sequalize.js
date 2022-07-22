const db = require("../models");

module.exports = async () => {
  try {
    db.sequelize.sync()
    console.log("Db started.")
  } catch (err) {
    console.log(err.message)
  }
}