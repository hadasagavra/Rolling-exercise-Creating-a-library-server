import Joi from 'joi';
import {model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new Schema(
  {
   username: String,
    email: { type: String, unique: true },
    password: String,
    phone: String
  }
)

userSchema.pre('save',function(){
    if (!this.isModified('password')) return;
    const salt=bcrypt.genSaltSync(process.env.SALT);
    const hash=bcrypt.hashSync(this.password,salt);
    this.password=hash;
})
userSchema.method('comparePasswords',function(newPassword){
  const isEqual=bcrypt.compareSync(this.password,newPassword)
  return isEqual
})
userSchema.set("toJSON",{
  virtuals:true,
  transform(doc,converted){
        delete converted.__v;
        delete converted._id;
        delete converted.password;
  }
}

)


export const validateUser=
{  
  login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
   updateUser:Joi.object({
       code: Joi.string().pattern(/^U\d{3}$/).required(),
       name:Joi.string(),
       email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
   }),
   addCourseToUser:Joi.object({
       name:Joi.string().required(),
     level:Joi.string(),
       startDate: Joi.date(),      
  endDate: Joi.date(),           
  status: Joi.string().valid('active', 'completed', 'dropped')
   })
}
const User = model("User", userSchema);

// ייצוא המודל
export default User;