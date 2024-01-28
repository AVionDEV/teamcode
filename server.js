const express = require('express');
require('dotenv').config({'path': './.env'});

const app = express();

app.use(express.json());
app.use('/public', express.static('public'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

const mainRouter = require('./routes/plate.js');
const redirect = require('./routes/redirect.js');
const auth = require('./routes/auth.js');
const register = require('./routes/register.js');

app.use('/', redirect);
app.use('/', mainRouter);
app.use('/', auth);
app.use('/', register);

const api_getuser = require('./routes/api/getuser.js');
const api_register = require('./routes/api/register.js');
const api_auth = require('./routes/api/auth.js');
const api_getusername = require('./routes/api/username.js');
const api_email = require('./routes/api/email.js');
const api_getProject = require('./routes/api/get_project.js');
const api_createProject = require('./routes/api/create_project.js');
const api_getAllProjects = require('./routes/api/get_all_projects.js')

app.use('/api', api_getuser);
app.use('/api', api_register);
app.use('/api', api_auth);
app.use('/api', api_getusername);
app.use('/api', api_email);
app.use('/api', api_getProject);
app.use('/api', api_getAllProjects);
app.use('/api', api_createProject);

app.listen(3000, 'localhost', () => {console.log("Server started at http://localhost:3000")});