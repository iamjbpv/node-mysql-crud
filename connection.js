const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodedemo",
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Connected');
    }   
    else{
        console.log(err.message);
    }
});

module.exports = mysqlConnection;