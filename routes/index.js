
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

router.get('/employees/:employeeId/', (req,res,next)=> {
  console.log('employeeId', req.params.employeeId);  // gives :uid
   
  try {
    let results = db.getEmployeeId(req.params.employeeId);
    res.json(results);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }

});



router.use('/documentation.html', swaggerUi.serve);
router.get('/documentation.html', swaggerUi.setup(swaggerDocument));
module.exports = router;

