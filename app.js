import express from 'express'
import bookRouter from './routes/book.route.js';
import userRouter from './routes/user.route.js';
import { config } from 'dotenv';
config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books',bookRouter);
app.use('/users',userRouter);
const port = process.env.PORT ?? 5000;
app.listen(port,()=>{
    console.log("welcome to hadasi program")
})
