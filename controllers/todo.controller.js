const models = require("../models");
//const schema = require("../schema");
const Task = models.tasks;
const Op = models.Sequelize.Op;
const Joi = require('@hapi/joi');

// Create and Save a new Task
exports.create = async (req, res,next) => {
  
  // Create a Task
  const task = {
    userid: req.body.userid,
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    completed: req.body.completed ? req.body.completed : false
  };

  // Save Task in the database
  const created = await Task.create(task).then(data => {
      res.status(201);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = async (req, res) => {
  try {
    const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const tasks = await Task.findAll({
      where: condition,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// Find a single Task with an id
exports.getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    
    const task = await Task.findByPk(id);
    if (task) {
      return res.status(200).json(task);
    }
    return res.status(404).send('Task with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
  
}

// Update a Task by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  // Create a Task
  const task = {
    userid: req.body.userid,
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    completed: req.body.completed ? req.body.completed : false
  };
  try {
    const updated = await Task.update(task, {
      where: { id: id }
    });
   
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      return res.status(200).json({ task: updatedTask });
    }
    res.status(404).send({
      
      message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
    });
} catch (error) {
    return res.status(500).send({message: task,ttest: id });
  }
};

// Delete a Task with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};
