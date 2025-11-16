import books from '../db.js'
//1
export const getAllBooks = (req,res)=>{
    const page = +req.query.page || 1;
  const limit = +req.query.page || 10;
 const search = req.query.search || ""; 
     let filteredBooks =[];
 if(search!="")
filteredBooks= books.filter(x => x.name.includes(search)); 
 const start=(page-1)*limit;
 const end=start+limit;
    const result = filteredBooks.slice(start, end);
     res.json({page,limit,result});
}
//2
export const getBooktById=(req,res,next)=>{
    const b=books.find(x=>x.code==req.params.code)
      if(!b){ next({status:404,message:`book ${req.params.code} not found!!`})}
    res.json(b);

}
//3
export const addBook=(req,res)=>{
    const newBook=req.body;
    books.push(newBook)
 res.status(201).json({ message: 'Book added', book: newBook });

}
//4
export const updateBook=(req, res,next) => {
const c =req.params.code;
  const index = books.findIndex(b => b.code === c);
  if(index==-1){ next({status:404,message:`book ${req.params.code} not found!!`})}
  books[index]=req.body;
  res.json(books[index])

}
//5
export const updateCust=(req,res,next)=>
    {
        const c =req.params.code;
        const user = req.params.user;
  const b = books.find(b => b.code == c);
      if(!b){ next({status:404,message:`book ${req.params.code} not found!!`})}
      b.isBorrowed=true;
      const newBorrow={ date: '2025-12-27', clientCode:user}
      b.questions.push(newBorrow)
      res.json(b)
    }
//6
export const updateIsBorrowed=(req,res,next)=>{
const c =req.params.code;
  const b = books.find(b => b.code === c);
      if(!b){ next({status:404,message:`book ${req.params.code} not found!!`})}
b.isBorrowed=false;
res.json(b)
}
//7
export const deleteBook=(req,res,next)=>{
const c = req.params.code;
  const index = books.findIndex(b => b.code === c);
  if(index==-1){ next({status:404,message:`book ${req.params.code} not found!!`})}
  else{
      books.splice(index,1)
  res.send("deleted seccussefuly")
  }
  

}


export const borrowBook = (req, res, next) => {
    const bookCode = req.params.code;      // קוד ספר
    const userObj  = req.body.user;        // אובייקט משאיל

     const book = books.find(b => b.code === bookCode);
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

    // החזרת ספר מעודכן
    res.json(book);
  }