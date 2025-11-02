import express from 'express'
import bookRouter from './routes/book.route.js';
import userRouter from './routes/user.route.js';
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books',bookRouter);
app.use('/users',userRouter);

app.listen(5000,()=>{
    console.log("welcome to hadasi program")
})