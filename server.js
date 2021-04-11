const express =require ('express');
const apiRouter = require ('./routes');
const app = express();
// for parsing multipart/form-data
app.use(express.json());
app.use('/COMP351/API/V1', apiRouter);

app.listen(process.env.PORT || '3000', () => {
  console.log(`server is runing on port: ${process.env.PORT || '3000'}`);
});
