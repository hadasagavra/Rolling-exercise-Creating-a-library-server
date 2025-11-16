import { Router } from "express";   
import {borrowBook ,getAllBooks,getBooktById,updateBook,updateCust,updateIsBorrowed,deleteBook,addBook } from "../controllers/book.controller.js";
const router=Router();
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { validateBook } from "../model/book.model.js";


//1
router.get('/',getAllBooks);
//2
router.get('/:code',getBooktById);
//3
router.post('/',addBook)
//4
router.put('/:code', updateBook)
//5
router.patch('/:code/:user',updateCust)
//6
router.patch('/:code',updateIsBorrowed)
//7
router.delete('/:code',deleteBook)

router.patch('/borrow/:code',joiValidator(validateBook.borrowBody),joiValidator(validateBook.borrowParams), borrowBook);
export default router;