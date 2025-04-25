import { Router } from "express";
import { scheduleBooking } from "../controller/bookingcontroller.js";
import { isAuthenticatedBooking } from "../middleware/bookingauth.js";

const bookingRouter = Router();
// Create listing route

bookingRouter.post("/booking", isAuthenticatedBooking, scheduleBooking );

export default bookingRouter;

