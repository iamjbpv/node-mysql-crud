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

getConnection(function(error, connection){
    if(!error) {
        var sql = `CREATE TABLE IF NOT EXISTS users (
            id int(11) NOT NULL AUTO_INCREMENT,
            email varchar(50) DEFAULT NULL,
            first_name varchar(50) DEFAULT NULL,
            last_name varchar(50) DEFAULT NULL,
            password varchar(255) DEFAULT NULL,
            is_deleted tinyint(1) NOT NULL DEFAULT '0',
            PRIMARY KEY (id)
          )`;
        connection.query(sql, function (err, result) {
            if (err){
                throw err.message;
            }
        });
    } else {
        throw error.errno;
    }
});

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