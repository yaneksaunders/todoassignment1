const Joi = require('@hapi/joi');
/*
const schema = Joi.object({
    taskid: Joi.number().required(),
    userid: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    date: Joi.date().required()
})*/

const schemas = { 
    createTask: Joi.object().keys({ 
        taskid: Joi.number().required(),
        userid: Joi.number().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        date: Joi.date().required(),
        completed: Joi.boolean() }), 
    taskList: { 
      page: Joi.number().required(), 
      pageSize: Joi.number().required() 
    }, 
    taskDetail: { 
     id: Joi.number().min(1).required() 
    } , 
    taskUpdate: { 
     id: Joi.number().min(1).required() 
    }, 
    taskDelete: { 
     id: Joi.number().min(1).required() 
    }
  }; 

