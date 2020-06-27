const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
require('dotenv').config();

/** required for Session */
var expressSession = require('express-session');
var sessionTimeInSeconds = 30 * 24 * 60 * 60;
app.use(expressSession({
  name: 'session',
  resave: false,
  saveUninitialized: false,
  proxy:false,
  secret: 'NodeJs9799530SecretKey515',
  cookie : {
    maxAge: sessionTimeInSeconds*1000,
  },
}));

/**  This module is used for flash messages in the system */
var flash  = require('express-flash');
app.use(flash());

global.WEBSITE_ROOT_PATH = path.resolve(__dirname);
global.WEBSITE_ROOT_PATH = global.WEBSITE_ROOT_PATH+'/';

require("./config/global_constant");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'acoountdeveloper@gmail.com',
    pass: 'System@123'
  }
});


app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000,
    "Content-Length": 200
}));
app.use(bodyParser.json());

/** Initialize Ejs Layout  */
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


var renderHtml = require('./render');
app.use(renderHtml);

//add the router
var server = app.listen(process.env.PORT,()=>{
    console.log('Server listening on port ' + process.env.PORT);
});
app.use('/', router);

/** Including mongo connection file */
var mongo	= require("./config/connection");
mongo.connectToServer(err=>{

	/** Including mongo connection file **/
	let db              = 	mongo.getDb();
    var routes = require('./routes/web');
    routes.configure(app,mongo);
});