module.exports = app => {
  const tasks = require("../controllers/todo.controller.js");
  //const schemas = require('../schemas'); 
  const middleware = require('../middleware');
  var router = require("express").Router();
  const Joi = require('@hapi/joi');

  const schemas = {
    createTask: Joi.object().keys({
      userid: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string(),
      date: Joi.date().required(),
      completed: Joi.bool() 
    }),
    taskList: {
      page: Joi.number().required(),
      pageSize: Joi.number().required()
    },
    taskDetail: {
      id: Joi.number().min(1).required()
    },
    taskUpdate: {
      id: Joi.number().min(1).required()
    },
    taskDelete: {
      id: Joi.number().min(1).required()
    }
  }

  // Create a new Task
  router.post("/", middleware(schemas.createTask, 'body'), tasks.create);

  // Update a Task with id
  router.put("/:id",middleware(schemas.createTask, 'body'), tasks.update);

  // Retrieve all tasks
  router.get("/", tasks.findAll);

  // Retrieve a single Task with id
  router.get("/:id",  tasks.getSingle);

  // Delete a Task with id
  router.delete("/:id", tasks.delete);

  app.use('/api/tasks', router);
};