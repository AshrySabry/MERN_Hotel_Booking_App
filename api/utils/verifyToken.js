import jwt from 'jsonwebtoken';
import { CreateError } from './error.js';

export const verifyToken = (req, res, next) => {
    console.log('4')
    const token = req.cookies.access_token;
    if (!token) {
        console.log('5')
      return next(CreateError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
        console.log('6')
      if (err) return next(CreateError(403, "Token is not valid!"));
      console.log('7', user);
      req.user = user;
      console.log('8',req.user);
      next();
    });
  };
  
  export const verifyUser = (req, res, next) => {
    console.log('1')
    verifyToken(req, res, next, () => {
        console.log('20',req.user.id)
        console.log('30',req.params.id)
        console.log('40',req.user.isAdmin)
      if (req.user.id === req.params.id || req.user.isAdmin) {
        console.log('3')
        next();
      } else {
        return next(CreateError(403, "You are not authorized!"));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        console.log('79',req.user.isAdmin)
      if (req.user.isAdmin) {
        next();
      } else {
        return next(CreateError(403, "You are not authorized!"));
      }
    });
  };