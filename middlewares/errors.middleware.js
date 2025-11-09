

export const notFound = (req, res, next) => 
{
    const error={
      status: 404,
      message: 'Route not found'
    }
    next(error);
}
/**
 * error handling middleware
*@param {{status?:number,message?:string}} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const generalError=(err,req,res,next)=>{
    const status=err.status??500;
    const message=err.message??'Server Error!';
    res.status(status).json({error: { message: message, fixMe: 'http://localhost:5000/app.js' }});
}
