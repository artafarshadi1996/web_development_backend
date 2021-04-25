const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

function validateid(id, res, checknumber) {
  const intId = parseInt(id);
  console.log('employeeId', intId);  // gives :uid
  if (isNaN(intId) || (intId<0)) {
    if (checknumber){
      res.sendStatus(400);
    }
    
    return null;
  }

  return intId; 
}

const express =require('express');
const db =require('../db');
const { getEmployeeId } = require('../db');
const router = express.Router();


router.post('/employees/add',async(req,res) => {
  let json_object = req.body;
  const employeeId = validateid(json_object.id, res, json_object.id !== undefined);

  console.log(json_object);

  try {  //gives the dictionarey to my db functions
    let results = await db.addEmployee(json_object)
    .then((results) => {
      const insertId = results.insertId;
      return db.getEmployeeId(insertId);
    })

    
    // res.json(results);
    res.json(results);
    
  } catch(e) {  
    if (e.code = "ER_DUP_ENTRY"){
      console.log(e);
      res.sendStatus(400);
      return;
    }

    console.log(e);
    res.sendStatus(500);
  }
});


router.get('/employees/:employeeId/', async (req,res,next)=> {
  const employeeId = validateid(req.params.employeeId, res, true);
  if (employeeId != null){
    try {
      let results = await db.getEmployeeId(employeeId);
      if (results.length == 0){
        res.sendStatus(404);
      } else {
        res.json(results);
      }   
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});


//delete req
//make dp function that can delete id
router.delete('/employees/:employeeId/', async (req,res,next)=> {
  const employeeId = validateid(req.params.employeeId, res, true);

  // if employeeId == null ... error

  if (employeeId == null){
    res.sendStatus(400);
    return;
  }
  
  try {
    let results = await db.deleteEmployeeId(employeeId);
    console.log(results);
    if (results.affectedRows == 0){
  
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }   
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }


});

//PUT update
// create function to update the values  pars through the json

router.put('/employees/:employeeId/',async(req,res) => {
  let json_object = req.body;
  const employeeId = validateid(req.params.employeeId, res, true);
  
  console.log(json_object);
  try {  //gives the dictionarey to my db functions
    let results = await db.updateEmployee(json_object,employeeId)
    .then((results) => {

    console.log(results);

      
      return db.getEmployeeId(employeeId);
    })

    res.json(results);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
  
});


router.post('/employees/:employeeId/timecard', async (req,res,next)=> {
  let json_object = req.body;  
  const employeeId = validateid(req.params.employeeId, res, true);
  const start = Date.parse(json_object.start);
  if (isNaN(start)){
    res.sendStatus(400);
    return;
  }
  const end = Date.parse(json_object.end);
  if (isNaN(end)){
    res.sendStatus(400);
    return;
  }
  //console.log(start)
  //console.log(end)

  try {
    let enteryresults = await db.totaltimecardsforaemployee(employeeId,json_object.start,json_object.end);
    let totalhours = await db.sumofthetotalhoursforemployee(employeeId,json_object.start,json_object.end);
    let variable = {
      "enteries": enteryresults, 
      "total":totalhours[0].total,
    }

    res.json(variable);
  }  catch(e) {
    console.log(e);
    res.sendStatus(500);
  }


  
 /* let varaible = [
    "Cat",
    "Dog",
    "Bunny"
  ];*/

});



  // department 

  ///POST
  router.post('/departments/add',async(req,res) => {
  let json_object = req.body;
  const departmentId = validateid(json_object.id, res, json_object.id !== undefined);

  console.log(json_object);

  try {  //gives the dictionarey to my db functions
    let results = await db.adddepartment(json_object)
    .then((results) => {
      const insertId = results.insertId;
      return db.getdepartmentById(insertId);
    })

    
    // res.json(results);
    res.json(results);
    
  } catch(e) {  
    if (e.code = "ER_DUP_ENTRY"){
      console.log(e);
      res.sendStatus(400);
      return;
    }

    console.log(e);
    res.sendStatus(500);
  }
});

///GET
router.get('/departments/:departmentId/', async (req,res,next)=> {
  const departmentId = validateid(req.params.departmentId, res, true);
  if (departmentId != null){
    try {
      let results = await db.getdepartmentById(departmentId);
      if (results.length == 0){
        res.sendStatus(404);
      } else {
        res.json(results);
      }   
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});


//delete req
//make dp function that can delete id
router.delete('/departments/:departmentId/', async (req,res,next)=> {
  const departmentId = validateid(req.params.departmentId, res, true);

  // if employeeId == null ... error

  if (departmentId == null){
    res.sendStatus(400);
    return;
  }
  
  try {
    let results = await db.deletedepartmentId(departmentId);
    console.log(results);
    if (results.affectedRows == 0){
  
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }   
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }


});

//PUT update
// create function to update the values  pars through the json

router.put('/departments/:departmentId/',async(req,res) => {
  let json_object = req.body;
  const departmentId = validateid(req.params.departmentId, res, true);
  
  console.log(json_object);
  try {  //gives the dictionarey to my db functions
    let results = await db.updatedepartments(json_object,departmentId)
    .then((results) => {

    console.log(results);

      
      return db.getdepartmentById(departmentId);
    })

    res.json(results);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
  
});

  

////Add and Delete timecards
router.post('/timecards/add',async(req,res) => {
  let json_object = req.body;
  const timecardid = validateid(json_object.id, res, json_object.id !== undefined);
  const employeeId = validateid(json_object.employeesid, res, true);
  const departmentId = validateid(json_object.departmentid, res, true);
  const hours = parseFloat(json_object.hours);
  if (isNaN(hours) || (hours>24) || (hours<0)) {
    res.sendStatus(400);
    return;
  }
  console.log(json_object);
  const date = Date.parse(json_object.date);
  if (isNaN(date)){

    res.sendStatus(400);
    return;
  }

  try {  //gives the dictionarey to my db functions
    let results = await db.addtimecards(json_object)
    .then((results) => {
      const insertId = results.insertId;
      return db.gettimecardsid(insertId);
    })

    
    // res.json(results);
    res.json(results);
    
  } catch(e) {  
    if (e.code = "ER_DUP_ENTRY"){
      console.log(e);
      res.sendStatus(400);
      return;
    }

    console.log(e);
    res.sendStatus(500);
  } 
});



//delete timecard
router.delete('/timecards/:timecardId', async (req,res,next)=> {
  const timecardid = validateid(req.params.timecardId, res, true);

  // if employeeId == null ... error
  if (timecardid == null){
    res.sendStatus(400);
    return;
  }
  
  try {
    let results = await db.deletetimecardsid(timecardid);
    console.log(results);
    if (results.affectedRows == 0){
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }   
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//////Timecardrequest

/*router.post('employees/:employeeid/timecard', async(req,res) => {
  let json_object = req.body;
  //console.log(json_object);
  const employeeId = validateid(req.params.employeesid, res, true);
  const start = Date.parse(json_object.start);
  if (isNaN(start)){
    res.sendStatus(400);
    return;
  }
  const end = Date.parse(json_object.end);
  if (isNaN(end)){
    res.sendStatus(400);
    return;
  }
  
  try {
      //gives the dictionarey to my db functions
      let results = await db.timecardhours(employeeId,start,end);
      res.json(results);
  } catch(e) {  
    if (e.code = "ER_DUP_ENTRY"){
      console.log(e);
      res.sendStatus(400);
      return;
    }

    console.log(e);
    res.sendStatus(500);
  }
});*/



//timecards   need joints  getemployeeid end start rang
router.use('/documentation.html', swaggerUi.serve);
router.get('/documentation.html', swaggerUi.setup(swaggerDocument));
module.exports = router;

