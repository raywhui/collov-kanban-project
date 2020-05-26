'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplicantSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  resume: {
    type: String,
    required: true
  },
  comments: {
    default: [],
    type: Array,
    trim: true
  },
  status: {
    title: { required: true, type: String, default: 'Applied' },
    order: { required: true, type: Number, default: 0 }
  },
  rating: {
    type: Number,
    default: 0
  }
}, { collection: 'Applicants', usePushEach: true });

var Applicants = _mongoose2.default.model('Applicants', ApplicantSchema);

exports.default = Applicants;