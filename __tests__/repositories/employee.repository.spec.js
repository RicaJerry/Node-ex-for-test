const EmployeeRepository = require("../../layers/dataAccess/repositories/EmployeeRepository");
const EmployeeService = require("../../layers/domain/services/EmployeeService");
const sinon = require('sinon');

// We don't have database connection anymore here
describe('Test EmployeeRepository ', () => {
  test('should exist', () => {
    expect(EmployeeService).toBeDefined();
  })

  describe('list all Employee', () => {
    const MockModel = {
      find: sinon.spy(), // Mockk fin function inside getAllEmployee
      findOne: sinon.spy(),
    }
    const employeeRep = EmployeeRepository.changeModelForTest(MockModel); // Change model for the mock mode
    test('getAllEmployee', () => {
      employeeRep.getAllEmployee();
      const expected = true;
      const actual = MockModel.find.calledOnce; // Check if `find` inside the service is called 
      expect(actual).toEqual(expected);
    });

    test('checkIfEmployeeExist', () => {
      employeeRep.checkIfEmployeeExist();
      const expected = true;
      const actual = MockModel.findOne.calledOnce; // Check if `find` inside the service is called 
      expect(actual).toEqual(expected);
    });

    test('getEmployeeByDate', () => {
      employeeRep.getEmployeeByDate();
      const expected = true;
      const actual = MockModel.find.calledTwice; // Check if `find` is called // Twice because we already call it before on getAllEmployee
      expect(actual).toEqual(expected);
    })
  });

  describe('Add new Employee', () => {
    test('save employee', () => {
      const findOne = sinon.spy(); // Function called inside service
      const create = sinon.spy();
      let mockEmployee;
      const mock = {
        "id": "14575",
        "name": "Ranaivoson",
        "firstName": "",
        "department": "informatique",
      };
      // Create MockModel with parameter 
      const MockModel = (data) => {
        mockEmployee = data;
        return {
          ...data,
          findOne: findOne,
          create: create
        }

      }
      const employeeRep = EmployeeRepository.changeModelForTest(MockModel(mock));
      employeeRep.addEmployees(mock);
      const expected = true;
      const actualFind = findOne.calledOnce;
      const actualCreate = create.calledOnce;

      expect(actualCreate).toEqual(expected);
      expect(mockEmployee.id).toEqual(mock.id);
      expect(mockEmployee.name).toEqual(mock.name);
      expect(mockEmployee.department).toEqual(mock.department);

    })
  });

})