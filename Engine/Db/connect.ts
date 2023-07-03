// const mysql = require('mysql2');
import mysql from 'mysql2';

const connection =mysql.createConnection({
  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock', //path to mysql sock in MAMP
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 8889,
});

// connection.connect((err)=>{
//   console.log(err);
  
// })

  // connection.query('select * from user', function(err, res, fields) {
  
  //   console.log(res, 'abc');
  //   console.log(err, 'e');
    
  // });

export default connection