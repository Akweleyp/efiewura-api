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
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    category: {
      type: String,
      enum: [
        "1 Bedroom",
        "2 Bedroom",
        "Single room self-contain",
        "Chamber and hall",
      ],
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

listingSchema.plugin(normalize);

export const ListingModel = model("Listing", listingSchema);
