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
export const addCourseToUser = (req, res, next) => {
  const c = req.params.code;
  const index = users.findIndex(u => u.code === c);
  if(index === -1) return next({ status: 404, message: `User ${c} not found!` });
  const course = req.body.course; // הקורס שנשלח ב-body
  if(!course) return res.status(400).json({ message: 'Course is required' });

  // אם אין למשתמש תת-תכונה courses – יוצרים מערך ריק
  if(!Array.isArray(users[index].courses)) {
    users[index].courses = [];
  }

  // מוסיפים את הקורס למערך
  users[index].courses.push(course);

  res.json(users[index]);
}