import { required } from "joi";
import { Schema, model, Types } from "mongoose";

import normalize from "normalize-mongoose";

// Create listing schema
const listingSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    pictures: { type: String, required: true },
    location: { type: String, required: true },
    // numberOfRooms: {type:Number, required:true},
    amenities: { type: String, required: true },
    userId: { type: Types.objectId, required: true, ref: user },
    isDeleted: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    category: {
      type: String,
      enum: ["1 Bedroom", "2 Bedroom", "Single room self-contain", "Chamber and hall"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

listingSchema.plugin(normalize);

export const ListingModel = model("Listing", listingSchema);
