module.exports = (sequelize, Sequelize) => {
	const ResultHistory = sequelize.define("result_histories", {
		id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
		resultId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'results',
				key: 'id'
			}
		},
		questionId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'questions',
				key: 'id'
			}
		},
		variantId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'variants',
				key: 'id'
			}
		}
	})
	return ResultHistory
}