const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.tests = require("./test")(sequelize, Sequelize);
db.questions = require("./question")(sequelize, Sequelize);
db.reports = require("./report")(sequelize, Sequelize);
db.results = require("./result")(sequelize, Sequelize);
db.result_histories = require("./resultHistory")(sequelize, Sequelize);
db.variants = require("./variant")(sequelize, Sequelize);

db.users.hasMany(db.tests, { foreignKey: 'userId', onDelete: 'cascade'})
db.users.hasMany(db.results, { foreignKey: 'userId', onDelete: 'cascade'})

db.tests.belongsTo(db.users)
db.tests.hasMany(db.questions, { foreignKey: 'testId', onDelete: 'cascade' })
db.tests.hasMany(db.results, { foreignKey: 'testId', onDelete: 'cascade' })

db.questions.belongsTo(db.tests)
db.questions.hasMany(db.variants, { foreignKey: 'questionId', onDelete: 'cascade'})

db.variants.belongsTo(db.questions)

db.results.belongsTo(db.tests)
db.results.belongsTo(db.users)
db.results.hasMany(db.result_histories, { foreignKey: 'resultId', onDelete: 'cascade'})

db.result_histories.belongsTo(db.results)

module.exports = db;