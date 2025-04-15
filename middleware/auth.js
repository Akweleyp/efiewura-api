import { UserModel } from "../model/usermodel.js";
import { expressjwt } from "express-jwt";

// Authenticate user at the signup / registration stage

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    const user = await UserModel.findById(req.auth.id);

    if (roles?.includes(user.role)) {
      next();
    } else {
      res.status(403).json("You have to be Authorized");
    }
  };
};
