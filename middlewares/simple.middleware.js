export const addRequestDate=(req,res,next)=>{
    req.currentDate=new Date();
    next();
}
export const printOnlyGet=(req,res,next)=>{
    if(req.method=='GET')
        console.log(req.currentDate);
    next();
}