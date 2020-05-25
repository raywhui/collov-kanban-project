import { Applicants } from '../models';

// Display list of all applicants
const findAll = async (req, res) => {
  try {
    const data = await Applicants.find();
    res.send(data);
    console.log('Data sent to client.');
  } catch (err) {
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  try {
    const findAppliedApplicants = await Applicants.find({
      'status.title': 'Applied',
    });
    const newBody = req.body;
    newBody.status = {
      order: findAppliedApplicants.length + 1,
    };
    newBody.resume = req.file.filename;
    console.log(req.file.filename);
    const applicant = new Applicants(newBody);
    await applicant.save();
    res.send({ applicant, created: true, file: req.file });
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateOne = async (req, res) => {
  try {
    const data = await Applicants.findOne({ _id: req.params.id });

    // Loop through any changes and update data
    for (let key in req.body) {
      console.log(`UpdatedOne Req:`, req.body);
      if (key === 'comments') {
        if (req.body[key].length > 0 && req.body[key].length <= 280) {
          data[key].push(req.body[key]);
        } else {
          return res.send('unacceptable character limit');
        }
      } else {
        data[key] = req.body[key];
      }
    }
    await data.save();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const data = await Applicants.find({ 'statis.title': req.params.status });
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
  updateOrder,
  deleteOne,
};

export default applicantsController;
