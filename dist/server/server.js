'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _multerGridfsStorage = require('multer-gridfs-storage');

var _multerGridfsStorage2 = _interopRequireDefault(_multerGridfsStorage);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
var port = process.env.PORT || 3001;

/*
 * @desc Initialize mongoDB
 */
var mongoURI = process.env.MONGODB_URI || 'mongodb://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@localhost:27017/kanban?authSource=admin';
_mongoose2.default.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = _mongoose2.default.connection;

/*
 * @desc Initialize gridfs stream
 */
var gfs = void 0;

_gridfsStream2.default.mongo = _mongoose2.default.mongo;
db.once('open', function () {
  // Init stream
  gfs = (0, _gridfsStream2.default)(db);
  gfs.collection('Applicants');
});

/*
 * @desc Initialize gridfs for resume storage
 */
var storage = new _multerGridfsStorage2.default({
  db: db,
  file: function file(req, _file) {
    return new Promise(function (resolve, reject) {
      console.log('run');
      _crypto2.default.randomBytes(16, function (err, buf) {
        if (err) {
          return reject(err);
        }
        var filename = buf.toString('hex') + _path2.default.extname(_file.originalname);
        var fileInfo = {
          filename: filename,
          bucketName: 'Applicants'
        };
        resolve(fileInfo);
      });
    });
  }
});

/*
 * @desc Multer logic to set file filter and move resume to req.file
 */
var upload = (0, _multer2.default)({
  storage: storage,
  fileFilter: function fileFilter(req, file, callback) {
    var ext = _path2.default.extname(file.originalname);
    if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
      return callback(new Error('Only .pdf, .doc, and .docx are allowed'));
    }
    callback(null, true);
  },
  limits: { fileSize: 1000000 }
});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

/*
 * @desc Maintain login session
 */
app.use((0, _expressSession2.default)({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

/*
 * @desc Middleware to allow routers to pass through /api endpoint (ie /api/applicants/)
 */
app.use('/api', upload.single('resume'), _routes.routes);

/* @route
 * @desc get resume file
 */
app.get('/', function (req, res) {
  return res.send('Hello World!');
});

app.get('/files/:filename', function (req, res) {
  gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
    // Check if file exists
    if (!file || file.length === 0) {
      return res.status(404).send('File Not Found');
    }
    // File exists
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename=' + file.filename);
    var readstream = gfs.createReadStream({ filename: file.filename });
    readstream.pipe(res);
  });
});

app.listen(port, function () {
  return console.log('Running on http://localhost:' + port);
});