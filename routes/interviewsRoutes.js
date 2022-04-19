import express from 'express';
import {
  createInterview,
  updateInterview,
  deleteInterview,
  getAllInterviews,
} from '../controllers/interviewsController.js';

const router = express.Router();

router.route('/').post(createInterview).get(getAllInterviews);
router.route('/:id').patch(updateInterview).delete(deleteInterview);

export default router;
