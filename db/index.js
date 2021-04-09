const mysql = require ('mysql');

 const pool = mysql.createPool({
   connectionLimit: 10,
   password: 'Fa123123@',
  user: 'Quizuser',
   database: "quiz",
	 host: "localhost",
   port: "3306"
 });

/*const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'Fa123123@',
  user: 'demoquiz',
  database: "quiz",
  host: "localhost",
  port: "3306"
});

*/

let chirprdb = {};
chirprdb.all = () => {
return new Promise ((resolve, reject) =>
 { pool.query(`SELECT * FROM Question `, (err,results) =>{
   if(err){
     return reject(err);
   }
   return resolve(results);

   });
 });

};

module.exports = chirprdb;
