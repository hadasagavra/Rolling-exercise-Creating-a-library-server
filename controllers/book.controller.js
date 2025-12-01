import Book from "../model/book.model.js";
import { isValidObjectId } from "mongoose";
import books from "../db.js"


//1
export const getAllBooks =async (req,res)=>{
  try{
    const { page = 1, limit = 5, name = '' } = req.query;
     const filteredBooks =await Book.find({ name: new RegExp(name, 'i') }).skip((page-1)*limit).limit(limit);
     res.json(filteredBooks);
  }catch(error){
next({status:500,message:`server failed`});  }
        

}
//2

export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      return next({ status: 404, message: `Book ${id} not found!` });

    const book = await Book.findById(id);
    if (!book)
      return next({ status: 404, message: `Book ${id} not found!` });

    res.json(book);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

//3
export const addBook = async (req, res, next) => {
  try {
    const newBook = new Book({ ...req.body });
    await newBook.save();
    res.status(201).json({ message: "Book added", book: newBook });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
//4
export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return next({ status: 404, message: `Book ${id} not found!` });

    const updatedBook = await Book.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedBook)
      return next({ status: 404, message: `Book ${id} not found!` });

    res.json(updatedBook);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
//5
export const updateCust=async(req,res,next)=>
    {
      try{
         const c =req.params.code;
        const user = req.params.user;
    const b = await Book.findOne({ code: bookCode });
      if(!b){ next({status:404,message:`book ${req.params.code} not found!!`})}
      b.isBorrowed=true;
      const newBorrow={ date: '2025-12-27', clientCode:user}
      b.questions.push(newBorrow)
       await b.save();
      res.json(b)
      }catch(error){
       next({ status: 500, message: error.message });
      }
       
    }
//6
export const updateIsBorrowed=async(req,res,next)=>{
  try{
const c =req.params.code;
    const book = await Book.findOne({ code: bookCode });
      if(!book){ next({status:404,message:`book ${req.params.code} not found!!`})}
book.isBorrowed=false;
await book.save();
res.json(book)
  }
catch(error){    next({ status: 500, message: error.message });
}

}
//7
export const deleteBook=async(req,res,next)=>{
  try{
    const deletedBook = await Book.findOneAndDelete({ code: bookCode });
    if (!deletedBook) return next({ status: 404, message: `Book ${bookCode} not found!!` });

    res.json({ message: "Deleted successfully", book: deletedBook });
  }catch(error){
    next({ status: 500, message: error.message });
  }
}


export const borrowBook =async (req, res, next) => {
  try{
    const bookCode = req.params.code;      // קוד ספר
    const userObj  = req.body.user;        // אובייקט משאיל
    console.log('bookCode:', req.params.code);

    const book = await Book.findOne({ code: bookCode });
    if (!book) {
        return next({ status: 404, message: `book ${bookCode} not found` });
    }

    const user = users.find(u => u.code === userObj.code);
    if (!user) {
        return next({ status: 404, message: `user ${userObj.code} not found` });
    }

        book.isBorrowed = true;

        const borrowRecord = {
        date: new Date().toISOString().split("T")[0],
        clientCode: user.code
    };
    book.questions.push(borrowRecord);
  if (!user.books.includes(book.code)) {
        user.books.push(book.code);
    }
  await book.save();
    res.json(book);
  }catch(error){
        next({ status: 500, message: error.message });

  }
    
  }
export const bookFile = (req, res) => {
  const bookCode = req.params.code;
  const book = books.find((b) => b.code === bookCode);

  if (!book) return res.status(404).send(`Book ${bookCode} not found`);
  if (!req.file) return res.status(400).send("No file uploaded.");

  const oldPath = req.file.path;
  const ext = path.extname(req.file.originalname);

  // שם הספר האמיתי אם קיים, אחרת קוד הספר
  const bookNameSafe = (book.name || bookCode).replace(/\s+/g, "_");
  const newPath = path.join("public/images", `${bookNameSafe}-${Date.now()}${ext}`);

  fs.renameSync(oldPath, newPath);

  res.json({
    message: `File uploaded for book ${bookCode}`,
    filename: path.basename(newPath),
    path: `/images/${path.basename(newPath)}`,
  });
};
