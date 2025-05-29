import { Router } from "express";
import { getBookings, scheduleBooking } from "../controller/bookingcontroller.js";
import { isAuthenticatedBooking } from "../middleware/bookingauth.js";

const bookingRouter = Router();
// Create listing route

bookingRouter.post("/booking", isAuthenticatedBooking, scheduleBooking );

bookingRouter.get("/bookings", isAuthenticatedBooking, getBookings)

export default bookingRouter;

