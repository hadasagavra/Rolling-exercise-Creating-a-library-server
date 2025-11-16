import express from 'express'
import bookRouter from './routes/book.route.js';
import userRouter from './routes/user.route.js';
import {addRequestDate,printOnlyGet} from './middlewares/simple.middleware.js'
import { blockDays } from './middlewares/blockDays.middleware.js';
import { generalError,notFound } from './middlewares/errors.middleware.js';
import { config } from 'dotenv';
import cors from 'cors'
import morgan from 'morgan'
config();
const app=express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public/images'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addRequestDate,printOnlyGet,blockDays([7]));
app.use('/books',bookRouter);
app.use('/users',userRouter);
app.use(notFound,generalError);
const port = process.env.PORT ?? 5000;
app.listen(port,()=>{
    console.log("welcome to hadasi program")
})
