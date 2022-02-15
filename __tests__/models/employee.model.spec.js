const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URL_TEST;
jest.setTimeout(10000);
const Employee = require('../../layers/dataAccess/models/Employee');
mongoose.connect(mongoDB);

describe('Test Employee model and his connection to the DB so we can mock after', () => { 
  beforeAll( async () => { // On vide avant chaques tests 
    await Employee.remove({});
  });

  afterEach( async () => {  // On vide après chaques tests 
    await Employee.remove({}); 
  });

  afterAll( async () => {
    await mongoose.connection.close();
  });

  test('should has a model', () => {
    expect(Employee).toBeDefined();
  });

  const mockEmployee = {
    "id": "14575",
    "name": "Ranaivoson",
    "firstName": "",
    "dateCreated": "2020-09-22T10:00:00",
    "department": "informatique",
  }
  describe('GET employee', () => {
    
    test('get an employee', async () => { 
      const emp = new Employee(mockEmployee);
      await emp.save();
      const foundEmploye = await Employee.findOne({id: mockEmployee.id});
      const expected = "Ranaivoson";
      expect(foundEmploye.name).toBe(expected);
    });
  });

  describe('Save employee', () => {
    test('save an employee', async ()=> {
      const emp = new Employee(mockEmployee);
      const saveEmp = await emp.save();
      const expected = "Ranaivoson";
      expect(saveEmp.name).toBe(expected);
    })
  });

  describe('Update employee', () => {
    test('update an employee', async ()=> {
      const emp = new Employee(mockEmployee);
      await emp.save();
      emp.name = "Update";
      const updateEmp = await emp.save();
      const expected = "Update";
      expect(updateEmp.name).toBe(expected);
    });
  });
})