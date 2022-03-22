import { register, login, updateUser } from '../controllers/authController.js';
import express from 'express';

const router = express.Router();

router.route('/register').post(register);
//render register form

router
  .route('/login')
  //render login form

  .post(login);
router
  .route('/updateUser')
  //render update form

  .patch(updateUser);

export default router;
