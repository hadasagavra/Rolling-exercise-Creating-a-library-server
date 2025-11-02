import { Router } from "express";   
import { getAllBooks,getBooktById,updateBook,updateCust,updateIsBorrowed,deleteBook,addBook } from "../controllers/book.controller";
const router=Router();
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
export default router;