/**
 * Integration test for app
 */
const request = require('supertest');
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URL_TEST;
const app = require('../createServer');

mongoose.connect(mongoDB);
jest.setTimeout(20000); // We have connexion to database so I set 20s as a timeout 

describe('Integration test for app', () => {
  test('Should exist', () => {
    expect(app).toBeDefined();
  });

  let server; // Create server

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
  });

  describe("employee route test", () => {
    describe("GET data on employee", () => {
      test('Can GET employees', async () => {
        await request(server).get('/api/employee').expect(200);
      });
  
      test('list by date', async () => {
        await request(server).get('/api/employee/?date=2020-09-24').expect(200);
      });

      test('list without date', async () => {
        await request(server).get('/api/employee/?date=').expect(200);
      });

      test('date invalide', async () => {
        await request(server).get('/api/employee/?date=2020-09-24d').expect(400);
      });
    });
    
    describe("POST data on employee", () => {
      test('Send a good data', async () => {
        const mockEmployee = {
          "id": "14575",
          "name": "Ranaivoson",
          "firstName": "",
          "dateCreated": "2020-09-22T10:00:00",
          "department": "informatique",
        }
        await request(server).post('/api/employee').send(mockEmployee).expect(200);
      });

      test('Send data without ID', async () => {
        const mockEmployee = {
          "name": "Ranaivoson",
          "firstName": "",
          "dateCreated": "2020-09-22T10:00:00",
          "department": "informatique",
        }
        await request(server).post('/api/employee').send(mockEmployee).expect(400);
      })
    });

    describe("PUT data on employee", () => {
      test('should have employeeId',async () => {
        await request(server).put('/api/employee/update/14502').expect(200);
      });

      test('fail without employeeId', async () => {
        await request(server).put('/api/employee/update/').expect(404);
      });
    });

    describe("Checkin & checkout", () => {
      test('checkin - should have employeeId in body',async () => {
        await request(server).put('/api/employee/checkin').send({employeeId: "14502", comment: ""}).expect(200);
      });

      test('checkin - fail without employeeId in body', async () => {
        await request(server).put('/api/employee/checkin').send({comment: ""}).expect(400);

      })

      test('checkout - should have employeeId in body',async () => {
        await request(server).put('/api/employee/checkout').send({employeeId: "14502", comment: ""}).expect(200);
      });

      test('checkout - fail without employeeId in body', async () => {
        await request(server).put('/api/employee/checkout').send({comment: ""}).expect(400);

      })
      
    })
    
  })

})