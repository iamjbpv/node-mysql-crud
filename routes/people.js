const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection');

const table_name= 'users';

router.get('/', (req,res) => {
    mysqlConnection.query(`SELECT * from ${table_name} WHERE is_deleted = 0`, (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err.message)
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(`SELECT * from ${table_name} WHERE id =${id} AND is_deleted = 0`, (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err.message)
        }
    });
});

router.post('/', (req,res) => {
    const { email, first_name, last_name, password } = req.body;
    var sql = `INSERT INTO ${table_name} (email, first_name, last_name, password) VALUES ('${email}', '${first_name}', '${last_name}', '${password}')`
    mysqlConnection.query(sql, function (err, result) {
        if (err){
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        console.log(result);
        return res.send('Inserted');
    });
});

router.put('/', (req,res) => {
    // const id = req.params.id;
    const { id, email, first_name, last_name, password } = req.body;
    var sql = `UPDATE ${table_name} SET password = '${password}' WHERE id = ${id}`;
    mysqlConnection.query(sql, function (err, result) {
        if (err){
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        console.log(result);
        return res.send('Updated');
    });
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    // const { id, email, first_name, last_name, password } = req.body;
    var sql = `UPDATE ${table_name} SET is_deleted = 1 WHERE id = ${id}`;
    mysqlConnection.query(sql, function (err, result) {
        if (err){
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        console.log(result);
        return res.send('Deleted');
    });
});

module.exports = router;