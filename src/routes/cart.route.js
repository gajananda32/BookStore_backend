import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new cart and add book into it
router.post('/:_id',userAuth, cartController.addToCart);

//route to remove book 
router.post('/remove/:_id',userAuth,cartController.removeBook);

export default router;