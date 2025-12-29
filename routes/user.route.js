import { Router } from "express";   
import {getAllUser,addUser,updateUser,login,addCourseToUser}from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { validateUser } from "../model/users.model.js";


const router=Router();
router.get('/',getAllUser)

//הרשמה
router.post('/',addUser)
//התחברות
router.put('/:code',joiValidator(validateUser.updateUser), updateUser)
router.patch('/:code',joiValidator(validateUser.addCourseToUser), addCourseToUser)
// login - check exists user
router.post('/login', joiValidator(validateUser.login), login);
export default router;
