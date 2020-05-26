'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Display list of all applicants
var findAll = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.Applicants.find();

          case 3:
            data = _context.sent;

            res.send(data);
            console.log('Data sent to client.');
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            res.status(500).send(_context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function findAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var findAppliedApplicants, newBody, applicant;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.Applicants.find({
              'status.title': 'Applied'
            });

          case 3:
            findAppliedApplicants = _context2.sent;
            newBody = req.body;

            newBody.status = {
              order: findAppliedApplicants.length + 1
            };
            newBody.resume = req.file.filename;
            console.log(req.file.filename);
            applicant = new _models.Applicants(newBody);
            _context2.next = 11;
            return applicant.save();

          case 11:
            res.send({ applicant: applicant, created: true, file: req.file });
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](0);

            res.status(500).send(_context2.t0);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 14]]);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var updateOne = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var data, key;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.Applicants.findOne({ _id: req.params.id });

          case 3:
            data = _context3.sent;
            _context3.t0 = regeneratorRuntime.keys(req.body);

          case 5:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 19;
              break;
            }

            key = _context3.t1.value;

            console.log('UpdatedOne Req:', req.body);

            if (!(key === 'comments')) {
              _context3.next = 16;
              break;
            }

            if (!(req.body[key].length > 0 && req.body[key].length <= 280)) {
              _context3.next = 13;
              break;
            }

            data[key].push(req.body[key]);
            _context3.next = 14;
            break;

          case 13:
            return _context3.abrupt('return', res.send('unacceptable character limit'));

          case 14:
            _context3.next = 17;
            break;

          case 16:
            data[key] = req.body[key];

          case 17:
            _context3.next = 5;
            break;

          case 19:
            _context3.next = 21;
            return data.save();

          case 21:
            res.send(data);
            _context3.next = 27;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t2 = _context3['catch'](0);

            res.status(500).send(_context3.t2);

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 24]]);
  }));

  return function updateOne(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateOrder = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var data, key;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models.Applicants.find({ 'statis.title': req.params.status });

          case 3:
            data = _context4.sent;

            console.log(req.body);

            // Loop through any changes and update data
            for (key in req.body) {
              console.log(key);
              console.log(req.body[key]);
              data[key] = req.body[key];
            }

            _context4.next = 8;
            return data.save();

          case 8:
            res.send(data);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);

            res.status(500).send(_context4.t0);

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 11]]);
  }));

  return function updateOrder(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteOne = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var food;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models.Applicants.findByIdAndDelete(req.params.id);

          case 3:
            food = _context5.sent;


            if (!food) res.status(404).send('No item found');
            res.status(200).send();
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](0);

            res.status(500).send(_context5.t0);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function deleteOne(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var applicantsController = {
  findAll: findAll,
  create: create,
  updateOne: updateOne,
  updateOrder: updateOrder,
  deleteOne: deleteOne
};

exports.default = applicantsController;