'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API Routes Test
var router = _express2.default.Router();

// Define route GET,POST
router.route('/applicants').get(_controllers.applicantsController.findAll).post(_controllers.applicantsController.create);

router.route('/applicants/:id').put(_controllers.applicantsController.updateOne).delete(_controllers.applicantsController.deleteOne);

router.route('/applicants/:status').put(_controllers.applicantsController.updateOrder);

router.route('/register').post(_controllers.userController.addUser);
router.route('/login').post(_controllers.userController.authenticateUser);

exports.default = router;