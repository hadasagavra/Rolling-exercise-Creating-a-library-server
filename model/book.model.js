import Joi from 'joi';
import { model, Schema } from "mongoose";

export const validateBook={

    borrowParams: Joi.object({
    code: Joi.string().pattern(/^B\d{3}$/).required()
}),

borrowBody: Joi.object({
    user: Joi.object({
        code: Joi.string().pattern(/^U\d{3}$/).required()
    }).required()
})
}

// הגדרת סכמה ל־Book
const bookSchema = new Schema({
  code: { type: String, required: true, unique: true }, // קוד ספר
  name: { type: String, required: true },               // שם הספר
  category: { type: String },                           // קטגוריה
  price: { type: Number, required: true },             // מחיר
  isBorrowed: { type: Boolean, default: false },       // האם הספר מושאל
  questions: [                                         // רשומות השאלות
    {
      date: { type: Date, required: true },
      clientCode: { type: String, required: true }
    }
  ]
});

// יצירת המודל
const Book = model("Book", bookSchema);

// ייצוא המודל
export default Book;
