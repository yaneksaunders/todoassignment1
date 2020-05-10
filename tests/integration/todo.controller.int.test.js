const request = require("supertest");
const app = require("../../app");
const newTask = require("../mock-data/new-task.json");
const taskid = 1;
const baddtaskid = 1;
const endpointUrl = "/api/tasks/";
let testTask;
/*
describe(baseUrl, () => {
  test("POST" + baseUrl, () => {
    return request(app)
      .post(baseUrl)
      .send(newTask)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toEqual(newTask.title);
        expect(response.body.done).toEqual(newTask.done);
       expect(response.body._id).toBeDefined();
      });
  });*/

describe('Post Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post(endpointUrl)
      .send(newTask)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.userid).toEqual(newTask.userid);
    expect(res.body.name).toEqual(newTask.name);
    expect(res.body.description).toEqual(newTask.description);
  });

  test("GET " + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].userid).toBeDefined();
    testTask = response.body[0];
  });

  test("GET by Id " + endpointUrl + ":id", async () => {
    const response = await request(app).get(endpointUrl + testTask.id);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(testTask.name);
    expect(response.body.description).toBe(testTask.description);
  });
  test("GET by id doesn't exist" + endpointUrl + ":id", async () => {
    const response = await request(app).get(endpointUrl + baddtaskid);
    expect(response.statusCode).toBe(404);
  });
  it(
    "should return error 422 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "non fully formed properties" });
      expect(response.statusCode).toBe(422);
    }
  );

  it("PUT " + endpointUrl, async () => {

    //update the previous entered task
    testTask.name = testTask.name + "v2";
    testTask.description = testTask.description + "v2";
    const res = await request(app)
      .put(endpointUrl + testTask.id)
      .send(testTask);
    expect(testTask).toBe(200);
    expect(res.body.name).toBe(testTask.name+ "v2");
    expect(res.body.description).toBe(testTask.description+ "v2");
  });
  it("should return error 422 on malformed data with PUT " + endpointUrl, async () => {
    const res = await request(app)
      .put(endpointUrl + baddtaskid)
      .send({ title: "non fully formed properties" });
    expect(res.statusCode).toBe(422);
  });
  test("HTTP DELETE", async () => {
    const res = await request(app)
      .delete(endpointUrl + testTask.id)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testTask.title);
    expect(res.body.done).toBe(testTask.done);
  });
  test("HTTP DELETE 404", async () => {
    const res = await request(app)
      .delete(endpointUrl + baddtaskid)
      .send();
    expect(res.statusCode).toBe(404);
  });
});