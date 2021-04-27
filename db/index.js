const mysql = require ('mysql');

 const pool = mysql.createPool({
   connectionLimit: 50,
   password: 'Fa123123@',
   user: 'Arta3',
   database: "admin_",
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

chirprdb.getEmployeeId = (id) => {
    ///*grabs all the columns from the table

  
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT id, Names as "name" FROM Employees where id=? `, id, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};


chirprdb.addEmployee = (JsonRequest) => {

  const id = JsonRequest.id;
  const name = JsonRequest.name;
  return new Promise ((resolve, reject) => {
    let sqlInsert;
    let sqlValues;

    if (id === undefined){
      sqlInsert = `INSERT INTO Employees (names) VALUES (?)`;
      sqlValues =  [name];
    } else {
      sqlInsert = `INSERT INTO Employees (id,names) VALUES (?,?)` ;
      sqlValues = [id, name];
    }

    pool.query(sqlInsert, sqlValues, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = chirprdb;



//delete method
chirprdb.deleteEmployeeId = (id) => {

  
  return new Promise ((resolve, reject) => {
    pool.query(`DELETE FROM Employees where id=? `, id, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
}


///update


chirprdb.updateEmployee = (JsonRequest, employeeId) => {

  const id = employeeId;
  const name = JsonRequest.name;
  return new Promise ((resolve, reject) => {
    let sqlUpdate;
    let sqlValues;
     
    
   sqlUpdate = `UPDATE Employees SET Names=? WHERE id=?`;
   sqlValues =  [name, id];

     

    pool.query(sqlUpdate, sqlValues, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};


/// Department

chirprdb.getdepartmentById = (id) => {
    ///*grabs all the columns from the table

  
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT * FROM department where id=? `, id, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};


chirprdb.adddepartment = (JsonRequest) => {

  const id = JsonRequest.id;
  const name = JsonRequest.name;
  return new Promise ((resolve, reject) => {
    let sqlInsert;
    let sqlValues;

    if (id === undefined){
      sqlInsert = `INSERT INTO department (Names) VALUES (?)`;
      sqlValues =  [name];
    } else {
      sqlInsert = `INSERT INTO department (id,Names) VALUES (?,?)` ;
      sqlValues = [id, name];
    }

    pool.query(sqlInsert, sqlValues, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = chirprdb;



//delete method
chirprdb.deletedepartmentId = (id) => {

  
  return new Promise ((resolve, reject) => {
    pool.query(`DELETE FROM department where id=? `, id, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
}


///update


chirprdb.updatedepartments = (JsonRequest, departmentId) => {

  const id = departmentId;
  const name = JsonRequest.name;
  return new Promise ((resolve, reject) => {
    let sqlUpdate;
    let sqlValues;
     
    
   sqlUpdate = `UPDATE department SET Names=? WHERE id=?`;
   sqlValues =  [name, id];

     

    pool.query(sqlUpdate, sqlValues, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};

///ADD timecards
chirprdb.addtimecards = (JsonRequest) => {

  const id = JsonRequest.id;
  const employeeId =JsonRequest.employeesid;
  const departmentId = JsonRequest.departmentid;
  const date = JsonRequest.date;
  const hours = JsonRequest.hours;
  






  return new Promise ((resolve, reject) => {
    let sqlInsert;
    let sqlValues;
    ///id	employeesid	Hours	departmentid	Date	
    if (id === undefined){
      sqlInsert = `INSERT INTO workingHours (employeesid, Hours, departmentid, Date) VALUES (?,?,?,?)`;
      sqlValues =  [employeeId, hours, departmentId, date];
    } else {
      sqlInsert = `INSERT INTO workingHours (id,employeesid, Hours, departmentid, Date) VALUES (?,?,?,?,?)` ;
      sqlValues = [id,employeeId, hours, departmentId, date];
    }

    pool.query(sqlInsert, sqlValues, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
};

chirprdb.gettimecardsid = (id) => {
  ///*grabs all the columns from the table

return new Promise ((resolve, reject) => {
  pool.query(`SELECT * FROM workingHours where id=? `, id, (err,results) =>{
    if(err){
      return reject(err);
    }
    return resolve(results);
  });
});
};

chirprdb.deletetimecardsid = (id) => {

  
  return new Promise ((resolve, reject) => {
    pool.query(`DELETE FROM workingHours where id=? `, id, (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
}


chirprdb.totaltimecardsforaemployee = (id,start,end) => {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT * FROM workingHours WHERE employeesid=? and Date BETWEEN ? AND ?`, [id,start, end], (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
}


chirprdb.sumofthetotalhoursforemployee = (id, start, end) => {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT SUM(Hours) as "total" FROM workingHours WHERE employeesid=? and Date BETWEEN ? AND ?`, [id, start, end], (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
}


///start and end



/*chirprdb.gettimecardhours = (id,startTime,endTime) =>{
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT SUM(Hours) FROM workingHours WHERE employeesid=? and Date BETWEEN ? AND ?`, [id,startTime,endTime], (err,results) =>{
      if(err){
        return reject(err);
      }
      return resolve(results);
    });
  });
}*/


