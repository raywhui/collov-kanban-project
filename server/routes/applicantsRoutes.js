import express from 'express';
import { applicantsController } from '../controllers';

// API Routes Test
const router = express.Router();

// Define route GET,POST
router
  .route('/applicants')
  .get(applicantsController.findAll)
  .post(applicantsController.create);

router
  .route('/applicants/:id')
  .put(applicantsController.updateOne)
  .delete(applicantsController.deleteOne);

router.route('/applicants/:status').put(applicantsController.updateOrder);

export default router;
