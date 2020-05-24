import express from 'express';
import mongoose from 'mongoose';
import { default as bodyParser } from 'body-parser';

import { routes } from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

/*
  Initialize mongoDB
*/
const mongoDB = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017/kanban?authSource=admin`;
// const mongoDB = 'mongodb://localhost:27017/kanban';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
  Middleware to allow routers to pass through /api endpoint (ie /api/applicants/)
*/
app.use('/api', routes);

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/test', (req, res) => res.send(console.log('hey!')));

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
