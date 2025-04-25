
import { expressjwt } from "express-jwt";


export const isAuthenticatedBooking = expressjwt({
  secret: process.env.JWT_SECRET_KEY || "default_secret",
  algorithms: ["HS256"],
  requestProperty: "auth" , 
  // The code above attaches token payload to req.auth
});
