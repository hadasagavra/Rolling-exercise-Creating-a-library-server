import { Router } from "express";   
import {getAllUser,addUser,updateUser}from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";


const router=Router();
router.get('/',getAllUser)

//הרשמה
router.post('/',addUser)
//התחברות
router.put('/:code', updateUser)
export default router;
