import express from 'express';
import {
  createInterview,
  updateInterivew,
  deleteInterview,
  getAllInterviews,
} from '../controllers/interviewsController';

const router = express.Router();

router.route('/').post(createInterview).get(getAllInterviews);
router.route('/:id').patch(updateInterivew).delete(deleteInterview);

export default router;
