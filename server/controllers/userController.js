import { User } from '../models';
import bcrypt from 'bcrypt';

const addUser = async (req, res) => {
  try {
    const userExist = await User.findOne({
      username: req.body.username,
    }).exec();
    if (!userExist) {
      const userData = {
        username: req.body.username,
        password: req.body.password,
      };
      console.log(userData);
      const user = new User(userData);
      await user.save();
      return res.send({ message: 'success' });
    } else {
      return res.send({ message: 'username taken' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(400).send({ message: 'The username does not exist' });
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      // result == true
      result
        ? res.send({
            message: 'success',
          })
        : res.send({
            message: 'passwordInvalid',
          });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const userController = {
  addUser,
  authenticateUser,
};

export default userController;
