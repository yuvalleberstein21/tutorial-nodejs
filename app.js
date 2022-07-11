const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//Set templating engine as hbs
app.set('view engine', 'hbs');

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static the css file
app.use(express.static('public'));
app.use(cors());

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.getConnection((err, connection) => {
    if (err) throw err; //not connected!
    else {
        console.log('DataBase Connected ad ID ' + connection.threadId)
    }
});

const routes = require('./server/routes/user');
app.use('/', routes);

// listen to port 3001
app.listen(port, () => console.log(`Listening on port ${port}`));