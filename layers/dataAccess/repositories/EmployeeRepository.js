const { diffInOutTime } = require("../../domain/utilities/utils");
const BaseRepository = require("../BaseRepository");
const Employee = require('./../models/Employee');

class EmployeeRepository extends BaseRepository {
  constructor() {
    super(Employee);
  }

  // Change model for test purpose 
  changeModelForTest(newModel) {
    this._modelType = newModel;
    return this;
  }

  async checkIfEmployeeExist(ident) {
    const exist = await this._modelType.findOne({ id: ident });
    return exist;
  }

  async addEmployees(data) {
    return await this._modelType.create(data);
  }

  async getAllEmployee() {
    const res = await this._modelType.find();
    return res;
  }

  /**
   * Pour avoir la liste d'une date il faut prendre la date avec la date du jour de lendemain et 
   * faire une requette pour les datas supérieur ou égale à la date demandée à 00h00 et les datas inférieu à demain 00h00
   */

  async getEmployeeByDate(date) {
    const dt = new Date(date);
    const dtPlus = new Date(dt.setDate(dt.getDate() + 1));
    const employees = await this._modelType.find({ "dateCreated": { $gte: new Date(date), $lt: dtPlus } });
    return employees;
  }

  async checkin(ident) {
    return await this._modelType.findOneAndUpdate({ id: ident }, {
      $set: {
        checkin: new Date(),
        diffInOutTime: 0
      }
    }, { new: true });
  }

  async checkout(ident, diffInOut, outDate) {
    return await this._modelType.findOneAndUpdate({ id: ident }, {
      $set: {
        checkout: outDate,
        diffInOutTime: diffInOut
      }
    }, { new: true });
  }

  async updateEmployee(ident, data) {
    return await this._modelType.findOneAndUpdate({ id: ident }, data, { new: true });
  }
}

module.exports = new EmployeeRepository();