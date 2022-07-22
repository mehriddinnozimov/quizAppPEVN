module.exports = (sequelize, Sequelize) => {
  const Variants = sequelize.define("variants", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAnswer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    questionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    }
  });
  return Variants;
};