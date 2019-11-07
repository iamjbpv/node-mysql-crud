const connection = require("../connection.js");
var People = function(){
    this.id;
    this.body;
    this.table_name= 'users';
};
 
People.prototype.list = async function(){//Async
    const table_name = this.table_name;
    return new Promise( (resolve) => { //Async
        connection.getConnection(function(error, connection){
            if(!error) {
                connection.query(`SELECT * from ${table_name} WHERE is_deleted = 0`, (err, rows, fields) => {
                    if(!err) {
                        resolve(rows);
                    } else {
                        throw err.message;
                    }
                });
            } else {
                console.log(error.errno);
                // throw error.errno;
            }
        }); 
    });
};

People.prototype.create = async function(){//Async
    const { email, first_name, last_name, password } = this.body;
    const table_name = this.table_name;
    return new Promise( (resolve) => { //Async
        connection.getConnection(function(error, connection){
            if(!error) {
                var sql = `INSERT INTO ${table_name} (email, first_name, last_name, password) VALUES ('${email}', '${first_name}', '${last_name}', '${password}')`
                connection.query(sql, function (err, result) {
                    if (err){
                        throw err.message;
                    }
                    connection.query(`SELECT * from ${table_name} WHERE id =${result.insertId} AND is_deleted = 0`, (err, rows, fields) => {
                        if(!err) {
                            resolve(rows);
                        } else {
                            throw err.message;
                        }
                    });
                });
            } else {
                throw error.errno;
            }
        }); 
    });
};

People.prototype.update = async function(){//Async
    const body = this.body;
    const table_name = this.table_name;
    console.log(body);
    return new Promise( (resolve) => { //Async
        connection.getConnection(function(error, connection){
            if(!error) {
                const id = body.id;
                var sql ="";
                for (var key in body) {
                    if (body.hasOwnProperty(key) && key != "id") {
                        item = body[key];
                        console.log(item);
                        sql += `UPDATE ${table_name} SET ${key} = '${item}' WHERE id = ${id};`;
                    }
                }
                // console.log(sql);
                connection.query(sql, function (err, result) {
                    if (!err){
                        connection.query(`SELECT * from ${table_name} WHERE id =${id} AND is_deleted = 0`, (err, rows, fields) => {
                            if(!err) {
                                resolve(rows);
                            } else {
                                throw error.message;
                            }
                        });
                    } else {
                        throw err.message;
                    }
                });
            } else {
                throw error.errno;
            }
        }); 
    });
};

People.prototype.delete = async function(){//Async
    const table_name = this.table_name;
    const id = this.id;
    return new Promise( (resolve) => { //Async
        connection.getConnection(function(error, connection){
            if(!error) {
                var sql = `UPDATE ${table_name} SET is_deleted = 1 WHERE id = ${id}`;
                // console.log(sql);
                connection.query(sql, function (err, result) {
                    if (!err){
                        resolve(result);
                    } else {
                        throw err.message;
                    }
                });
            } else {
                throw error.errno;
            }
        }); 
    });
};
 
module.exports = People;