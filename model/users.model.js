import Joi from 'joi';

export const validateUser=
{
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