module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("questions", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    testId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tests',
        key: 'id'
      }
    }
  });
  return Question;
};