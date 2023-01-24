import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/signup', newUserValidator, userController.createNewUser);

//route to signin user
router.post('/signin',userController.signin);

//route to get a single user by their user id
router.post('/forgot', userController.forgotPassword);

//route to update a single user by their user id
router.put('/reset', resetAuth ,userController.ResetPassword);


export default router;
