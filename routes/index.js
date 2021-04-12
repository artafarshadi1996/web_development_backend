
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const express =require('express');
const db =require('../db');
const router = express.Router();

/*
router.get('/',async (req, res, next)=> {
  try {
    let results = await db.all();
    res.json(results);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});
*/

router.post('/',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    response.send(request.body);
});

router.get('/employees/:employeeId/', async (req,res,next)=> {
  const employeeId = parseInt(req.params.employeeId);
  console.log('employeeId', employeeId);  // gives :uid
  if (isNaN(employeeId) || (employeeId<0)) {
    return res.sendStatus(400);
  }

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

});



router.use('/documentation.html', swaggerUi.serve);
router.get('/documentation.html', swaggerUi.setup(swaggerDocument));
module.exports = router;

