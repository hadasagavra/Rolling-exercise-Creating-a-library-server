import bcrypt from 'bcryptjs';
import  User  from '../model/users.model.js'
export const getAllUser = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};
export const addUser=async(req,res,next)=>{
  try{
const newUser = new User(req.body);
     await newUser.save()
       res.status(201).json({ message: 'User added', user: newUser });
  }catch(error){
        next({ status: 409, message: error.message });
  }
}
 export const updateUser=(req, res,next) => {
  try{const user =User.findOneAndUpdate({
 code: req.params.code,
}, req.body,
 { new: true })
  if (!user) return next({ status: 404, message: `User ${req.params.code} not found!` });
    res.json(user);}catch (error) {
    next(error);
  }
}
export const addCourseToUser = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { course } = req.body;

    if (!course) return next({ status: 400, message: "Course is required" });

    const user = await User.findOne({ code });
    if (!user) return next({ status: 404, message: `User ${code} not found!` });

    if (!Array.isArray(user.courses)) user.courses = [];
    user.courses.push(course);

    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login =async (req, res) => {
  try{
        const { email, password } = req.body;
        const user=await User.findOne({email})
        if(!user||!user.comparePasswords(password)){
            return next({ status: 400, message: `email/password invalid` });
        }
       res.json(user)
  }catch(error){
      next({ message: error.message });
  }
};
