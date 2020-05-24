import { Applicants } from '../models';

// Display list of all applicants
const findAll = async (req, res) => {
  try {
    const data = await Applicants.find();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  try {
    const applicant = new Applicants(req.body);
    await applicant.save();
    res.send(applicant);
    console.log('created');
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateOne = async (req, res) => {
  try {
    const data = await Applicants.findOne({ _id: req.params.id });
    console.log(req.body);

    // Loop through any changes and update data
    for (let key in req.body) {
      console.log(key);
      console.log(req.body[key]);
      data[key] = req.body[key];
    }

    await data.save();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteOne = async (req, res) => {
  try {
    const food = await Applicants.findByIdAndDelete(req.params.id);

    if (!food) res.status(404).send('No item found');
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const applicantsController = {
  findAll,
  create,
  updateOne,
  deleteOne,
};

export default applicantsController;
