'use strict';

const express = require ('express');
const chalk = require('chalk');
const bodyParser =  require("body-parser");
const cors = require("cors");

// .env file in ./.env
require('dotenv').config();

// initialize express app
const app = express();
// ======================= middleware ======================= //

// morganChalk middlware to get colorized log on requests 
const morganMiddleware = require('./middleware/morganMiddleware').morganChalk;
app.use(morganMiddleware);
// using corse middleware
app.use(cors());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ======================= routes ======================= //
// root url
app.get('/',(req,res)=>res.status(200).send({
    message:"Enamel Hub Root URL"
}))
// api routes
const apiRoutes = require('./src/routes/api')
app.use('/api',apiRoutes);

// listen on port 3000
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(chalk.cyan("============ Enamel Hub Started !! ============"))
    console.log(chalk.cyan(`Server Started on http://localhost:${port}`));
})