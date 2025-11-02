import books from '../db.js'
//1
export const getAllBooks = (req,res)=>{
    const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
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
export const getBooktById=(req,res)=>{
    const b=books.find(x=>x.code==req.params.code)
    res.json(b);

}
//3
export const addBook=(req,res)=>{
    const newBook=req.body;
    books.push(newBook)
 res.status(201).json({ message: 'Book added', book: newBook });

}
//4
export const updateBook=(req, res) => {
const c =req.params.code;
  const index = books.findIndex(b => b.code === c);
  if(index==-1){res.status(404).send("not found!!")}
  books[index]=req.body;
  res.json(books[index])

}
//5
export const updateCust=(req,res)=>
    {
        const c =req.params.code;
        const user = req.params.user;
  const b = books.find(b => b.code == c);
      if(!b){res.status(404).send("not found!!")}
      b.isBorrowed=true;
      const newBorrow={ date: '2025-12-27', clientCode:user}
      b.questions.push(newBorrow)
      res.json(b)
    }
//6
export const updateIsBorrowed=(req,res)=>{
const c =req.params.code;
  const b = books.find(b => b.code === c);
      if(!b){res.status(404).send("not found!!")}
b.isBorrowed=false;
res.json(b)
}
//7
export const deleteBook=(req,res)=>{
const c = req.params.code;
  const index = books.findIndex(b => b.code === c);
  if(index==-1){res.status(404).send("not found!!")}
  else{
      books.splice(index,1)
  res.send("deleted seccussefuly")
  }

}