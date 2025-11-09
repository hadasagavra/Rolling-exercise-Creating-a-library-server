export const blockDays=(days=[])=>{
    /**
     * middleware block server on some days
     * @param {import("express").Request} req request data
     * @param {import("express").Response} res response data
     * @param {import("express").NextFunction} next function to move to the next middleware
     */
 const blockMiddleware=(req,res,next)=>{
    days=days.map(x=>x-1);
        const day = req.currentDate.getDay();
    const hour = req.currentDate.getHours();
    if((day==5&&hour>=12)||(day==6&&hour<22)){
      return res.status(500).json({message:`not working on shabbat !!!!!!!!!!` });
    }
   
    next();
 }
 return blockMiddleware;
}