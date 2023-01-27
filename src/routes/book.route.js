import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all books
router.get('/allbook', userAuth,bookController.getAllBooks);

//router to get a note by id
router.get('/:_id', bookController.getBook);

export default router;