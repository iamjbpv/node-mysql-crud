const MySQL = require("mysql");
const config = require("./config/default.json");
connectionPool = MySQL.createPool({
    host: config.db_config.host,
    user: config.db_config.user,
    password: config.db_config.password,
    database: config.db_config.database,
    multipleStatements: config.db_config.multipleStatements
});

const getConnection = function(done){
   connectionPool.getConnection(done);
};

module.exports = {getConnection: getConnection};


// const mysql = require('mysql');
// const mysqlConnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "nodedemo",
//     multipleStatements: true
// });

// mysqlConnection.connect((err)=>{
//     if(!err){
//         console.log('Connected');
//     }   
//     else{
//         console.log(err.message);
//     }
// });

// module.exports = mysqlConnection;