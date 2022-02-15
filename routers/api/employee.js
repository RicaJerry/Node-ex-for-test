const EmployeeService = require('../../layers/domain/services/EmployeeService');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const filter = {
      "date": req.query['date'] ? req.query['date'] : ""
    }
    let list ;
    const dt = Date.parse(filter.date); // Check if string is a date 
    if(filter.date){
      if(isNaN(dt)){ 
        res.status(400).send({ message: "invalide Date "});
        return;
       }else {
         list = await EmployeeService.getEmployeeByDate(filter.date);
       }
    }else {
      list = await EmployeeService.findAll()
    }
    res.status(200).send(list);    
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    if(!data.id) {
      res.status(400).send({ message: "missing id "});
      return;
    }
    const employee = await EmployeeService.addEmployee(data);
    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
});

router.put('/update/:ident', async (req, res, next) => {
  try {
    const data = req.body;
    if (req.body.id) delete data.id;
    const employee = await EmployeeService.updateEmployee(req.params['ident'], data);
    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
})

router.put('/checkin', async (req, res, next) => {
  try {
    const data = req.body;
    if(!data.employeeId) {
      res.status(400).send({ message: "missing emoployeeId"});
      return;
    }
    const employee = await EmployeeService.checkin(data.employeeId);
    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
});

router.put('/checkout', async (req, res, next) => {
  try {
    const data = req.body;
    if(!data.employeeId) {
      res.status(400).send({ message: "missing emoployeeId"});
      return;
    }
    const employee = await EmployeeService.checkout(data.employeeId);
    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;