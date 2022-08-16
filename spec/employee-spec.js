import Request  from 'request';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("Employee", () => {
  const endpoint = "http://localhost:3000/employee";

  it("GET All Employees", () => {
    Request.get(endpoint, (error, response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});
