import { Router } from "express";   
import {borrowBook ,getAllBooks,getBookById,updateBook,updateCust,updateIsBorrowed,deleteBook,addBook,bookFile } from "../controllers/book.controller.js";
const router=Router();
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { validateBook } from "../model/book.model.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => {
    const bookCode = req.params.code.replace(/\s+/g, "_"); // קוד הספר מה-URL
    const ext = path.extname(file.originalname);
    cb(null, `${bookCode}-${Date.now()}${ext}`); // שם + חותמת זמן
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});

//1
router.get('/',getAllBooks);
//2
router.get('/:code',getBookById);
//3
router.post('/',addBook)
//4
router.put('/:code', updateBook)
//5
router.patch('/borrow/:code',joiValidator(validateBook.borrowBody),joiValidator(validateBook.borrowParams), borrowBook);
//6
router.patch('/:code',updateIsBorrowed)
//7
router.delete('/:code',deleteBook)
//8
router.patch('/:code/:user',updateCust)

router.post('/upload/:code',upload.single('image'),bookFile)

export default router;