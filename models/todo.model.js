module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      userid: {
        type: Sequelize.BIGINT()
      },
      name: {
        type: Sequelize.STRING()
      },
      description: {
        type: Sequelize.STRING()
      },
      date: {
        type: Sequelize.DATE
      },
      completed: {
        type: Sequelize.BOOLEAN
      }
    });

    return Task;
  };