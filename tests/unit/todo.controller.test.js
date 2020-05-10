require('iconv-lite').encodingExists('foo')
const TodoController = require("../../controllers/todo.controller");
const httpMocks = require("node-mocks-http");
const newtask = require("../mock-data/new-task.json");
const TodoModel = require("../../models/todo.model");
const db = require("../../models");
const Task = db.tasks;
const id = 1;
Task.create = jest.fn();
Task.findByPk = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    //req.set("Authorization", "basic " + new Buffer("admin:pass@word1").toString("base64"));
    res = httpMocks.createResponse();
    next = jest.fn();
})

jest.mock('../../models/todo.model', () => () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();
    return dbMock.define('tasks', {
        "userid": "1",
        "name": "name",
        "description": "fdesdsfcription",
        "date": "2019-01-01",
        "completed": "false"
    })
});
/*
describe("TodoController.create", () => {
    beforeEach(() => {
        req.body = newtask;
        
    })
    it("should have a create function", () => {
        expect(typeof TodoController.create).toBe("function");
    });
    it("should should call Task.create", async () => {

        const createdmodel = await TodoController.create(req, res,next);
        expect(TodoModel.create).toBeCalled();
        expect(TodoModel.create).toBeCalledWith(newtask);
    })
    it("should return a 201 response code", async () => {

        const createdmodel = await TodoController.create(req, res,next);
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it("should return return the json response", async () => {
        const createdmodel = await TodoModel.create.mockReturnValue(newtask);
        TodoController.create(req, res),next;
        expect(res._getJSON()).toStrictEqual(newtask)
    })
}); */

describe("TodoController.getSingle", () => {
    it("should have a getTodoById", () => {
        expect(typeof TodoController.getSingle).toBe("function");
    });
    it("should call TodoModel.findById", async () => {

        //await TodoController.getSingle(req, res);
        expect(Task.findByPk).toBeCalled();
    });
    it("should return json body and response code 200", async () => {
        req.params.id = id;
        //TodoModel.findByPk.mockReturnValue(taskid);
        const adwer = await TodoController.getSingle(req, res);

        expect(res.statusCode).toBe(200);

    });
    it("should do error handling", async () => {
        const errorMessage = { message: "error finding todoModel" };
        const rejectedPromise = Promise.reject(errorMessage);
        //TodoModel.findById.mockReturnValue(rejectedPromise);
        //await TodoController.getTodoById(req, res);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should handle 404", async () => {
        //TodoModel.findByIdAndUpdate.mockReturnValue(null);
        //await TodoController.updateTodo(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});