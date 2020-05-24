import express from 'express';
import { applicantsController } from '../controllers';

// API Routes Test
const router = express.Router();

// Definte route GET,POST
router
  .route('/applicants')
  .get(applicantsController.findAll)
  .post(applicantsController.create);

router
  .route('/applicants/:id')
  .put(applicantsController.updateOne)
  .delete(applicantsController.deleteOne);

export default router;
