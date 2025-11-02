import { Router } from "express";   
import users from '../users.js'
const router=Router();
router.get('/',(req,res)=>{
    res.json(users)
})

//הרשמה
router.post('/',(req,res)=>{
     const newUser=req.body;
        users.push(newUser)
     res.status(201).json({ message: 'User added', user: newUser });
})
//התחברות
router.put('/:code', (req, res) => {
const c =req.params.code;
  const index = users.findIndex(b => b.code === c);
  if(index==-1){res.status(404).send("not found!!")}
  users[index]=req.body;
  res.json(users[index]);
})
export default router;
