import { Schema, Types , model} from "mongoose";

import normalize from "normalize-mongoose";

// Create booking schema
 const bookingSchema = new Schema({
   
    name: { type: String, required: true, unique: true },
    preferredDate: { type: Date, required: true },
    contact: { type: Number, required: true },
    listingId: {type:Types.ObjectId, required: true, ref: "Listing"}
 });

 bookingSchema.plugin(normalize);

 export const BookingModel = model("Booking", bookingSchema);