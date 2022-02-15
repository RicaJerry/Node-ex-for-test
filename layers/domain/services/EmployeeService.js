const EmployeeRepository = require("../../dataAccess/repositories/EmployeeRepository");
const { diffInOutTime } = require("../utilities/utils");
const BaseService = require("./BaseService");

class EmployeeService extends BaseService {
  constructor() {
    super(EmployeeRepository, 'EmployeeService');
  }

  async addEmployee(data) {
    const exist = await EmployeeRepository.checkIfEmployeeExist(data.id);
    const msg = {
      message: "Employee already exist"
    }
    return exist ? msg : EmployeeRepository.addEmployees(data);
  }

  getEmployeeByDate(date) {
    return EmployeeRepository.getEmployeeByDate(date);
  }

  async checkin(ident) {
    const exist = await EmployeeRepository.checkIfEmployeeExist(ident);
    // First check if employee exist
    const msg = {
      message: "Employee does't exist"
    }
    return exist ? EmployeeRepository.checkin(ident) : msg;
  }

  async checkout(ident) {
    const exist = await EmployeeRepository.checkIfEmployeeExist(ident);
    // First check if employee exist
    const msg = {
      message: "Employee does't exist"
    }
    if(!exist) {
      return msg;
    }
    const outDate = new Date();
    const diffInOut = diffInOutTime(exist.checkin, outDate);
    return EmployeeRepository.checkout(ident, diffInOut, outDate);
  }

  async updateEmployee(ident, data) {
    const exist = await EmployeeRepository.checkIfEmployeeExist(ident);
    // First check if employee exist
    const msg = {
      message: "Employee does't exist"
    }
    return exist ? EmployeeRepository.updateEmployee(ident, data) : msg;
  }
}

module.exports = new EmployeeService();