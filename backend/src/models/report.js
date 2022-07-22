module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define("reports", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  	title: {
  		type: Sequelize.STRING,
  		allowNull: false
  	},
  	content: {
  		type: Sequelize.TEXT
  	},
  	userId: {
  		type: Sequelize.INTEGER,
  		allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
  	},
  	testId: {
  		type: Sequelize.INTEGER,
  		allowNull: false,
      references: {
        model: 'tests',
        key: 'id'
      }
  	},
    testUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  	status: {
  		type: Sequelize.ENUM("pending", "accepted"),
  		defaultValue: "pending",
  		allowNull: false
  	}

  });
  return Report;
};