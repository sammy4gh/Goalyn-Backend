import jsonwebtoken  from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModels";
import {NextFunction, Request, Response} from "express";
import {UserType} from "../Types/UserTypes";

const jwt = jsonwebtoken
const User = userModel
const protect = expressAsyncHandler(async (req: Request ,res: Response, next: NextFunction)=>{
 let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const secrete  = process.env.JWT_SECRETE || ""
            const decoded = jwt.verify(token, secrete)

            //Get user from token

            // @ts-ignore
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }


    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

export {protect}