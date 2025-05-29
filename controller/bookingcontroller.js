import { BookingModel } from "../model/bookingmodel.js";
import { bookingValidator } from "../validator/bookingvalidator.js";

// Post a booking

export const scheduleBooking = async (req, res) => {
  try {
    // Validate the incoming request
    const { error, value } = bookingValidator.validate(req.body, { abortEarly: false }
    );

    if (error) {
      console.log("Validation error details:", error.details);
      return res.status(422).json({
        message: "Validation unsuccessful",
        errors: error.details, // Include validation errors in the response
        status: "error",
      });
    }

    // Ensure the user is authenticated
    if (!req.auth?.id) {
      return res.status(401).json({
        message: "User is not authenticated",
        status: "error",
      });
    }

    // Save the listing details to the database
    const result = await BookingModel.create({
      ...value,
     
    });

    return res.status(201).json(result); // Success response
  } catch (error) {
    console.error("Error occurred in scheduling a site viewing:", error);

    if (error.name === "MongooseError") {
      return res.status(409).json({
        message: "Request not successful, Internal server error",
        status: "error",
      });
    }

    return res.status(500).json({
      message: "Unexpected server error",
      status: "error",
    });
  }
};



export const getBookings = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    const result = await BookingModel.find({
      ...JSON.parse(filter),
      isDeleted: false,
    }).sort(JSON.parse(sort));
    if (result.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.json({
      message: "Here are your bookings",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request unsuccessful, kindly reload the page ",
      status: "error",
    });
  }
};
