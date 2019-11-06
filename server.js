const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const peopleRouter = require('./routes/people.js');

const app = express();
app.use(bodyParser.json());
app.use('/api/people', peopleRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //  MIDDLEWARE to allow any address

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//static no dynamic files, server static files
app.use(express.static(path.join(__dirname, 'client/dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));