import express from 'express';
import mongoose from 'mongoose';
import { default as bodyParser } from 'body-parser';
import crypto from 'crypto';
import path from 'path';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import multer from 'multer';
import session from 'express-session';

import { routes } from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

/*
 * @desc Initialize mongoDB
 */
const mongoURI =
  process.env.MONGODB_URI ||
  `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017/kanban?authSource=admin`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

/*
 * @desc Initialize gridfs stream
 */
let gfs;

Grid.mongo = mongoose.mongo;
db.once('open', function () {
  // Init stream
  gfs = Grid(db);
  gfs.collection('Applicants');
});

/*
 * @desc Initialize gridfs for resume storage
 */
const storage = new GridFsStorage({
  db: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log('run');
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'Applicants',
        };
        resolve(fileInfo);
      });
    });
  },
});

/*
 * @desc Multer logic to set file filter and move resume to req.file
 */
const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
      return callback(new Error('Only .pdf, .doc, and .docx are allowed'));
    }
    callback(null, true);
  },
  limits: { fileSize: 1000000 },
});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * @desc Maintain login session
 */
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
  })
);

/*
 * @desc Middleware to allow routers to pass through /api endpoint (ie /api/applicants/)
 */
app.use('/api', upload.single('resume'), routes);

/* @route
 * @desc get resume file
 */
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file exists
    if (!file || file.length === 0) {
      return res.status(404).send('File Not Found');
    }
    // File exists
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename=${file.filename}`);
    const readstream = gfs.createReadStream({ filename: file.filename });
    readstream.pipe(res);
  });
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
