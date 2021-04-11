const express =require ('express');
const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
const apiRouter = require ('./routes');
const app = express();
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/COMP351/API/V1', apiRouter);

app.listen(process.env.PORT || '3000', () => {
  console.log(`server is runing on port: ${process.env.PORT || '3000'}`);
});
