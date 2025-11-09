import users from '../users.js'
export const getAllUser=(req,res)=>{
    res.json(users)
}
export const addUser=(req,res)=>{
     const newUser=req.body;
        users.push(newUser)
     res.status(201).json({ message: 'User added', user: newUser });
}
 export const updateUser=(req, res,next) => {
const c =req.params.code;
  const index = users.findIndex(b => b.code === c);
  if(index==-1){ next({status:404,message:`user ${req.params.code} not found!!`})}
  users[index]=req.body;
  res.json(users[index]);
}