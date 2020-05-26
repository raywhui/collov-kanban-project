'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Applicants = undefined;

var _applicantsModel = require('./applicantsModel.js');

var _applicantsModel2 = _interopRequireDefault(_applicantsModel);

var _userModel = require('./userModel.js');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Applicants = _applicantsModel2.default;
exports.User = _userModel2.default;