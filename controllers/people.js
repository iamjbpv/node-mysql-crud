const People = require("../models/people.js");

const list = async function(req, res){
    var newPeople = new People(req.body); //create new object and pass params
    try {
        var result = await newPeople.list();// wait for this process to be completed before proceeding
        res.json(result);
        // do other things...
    } catch(err) {
        console.log(err.message);
    }
};

const create = async function(req, res){
    var newPeople = new People(); //create new object and pass params
    newPeople.body = req.body;
    try {
        var result = await newPeople.create();// wait for this process to be completed before proceeding
        res.json(result);
        // do other things...
    } catch(err) {
        console.log(err.message);
    }
};

const update = async function(req, res){
    var newPeople = new People(); //create new object and pass params
    newPeople.body = req.body;
    try {
        var result = await newPeople.update();// wait for this process to be completed before proceeding
        res.json(result);
        // do other things...
    } catch(err) {
        console.log(err.message);
    }
};

const deleteRow = async function(req, res){
    // console.log(req.params.id);
    
    var newPeople = new People(); //create new object and pass params
    newPeople.id = req.params.id;
    try {
        var result = await newPeople.delete();// wait for this process to be completed before proceeding
        res.json(result);
        // do other things...
    } catch(err) {
        console.log(err.message);
    }
};
module.exports = {create: create, list: list, update: update, deleteRow: deleteRow};