module.exports = (sequelize, Sequelize) => {
	const Result = sequelize.define("results", {
		id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
		testId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
        model: 'tests',
        key: 'id'
      }
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
        model: 'users',
        key: 'id'
      }
		},
		numerator: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		denominator: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	})
	return Result
}