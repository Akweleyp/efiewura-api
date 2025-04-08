import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

// create user schema for tenants and landlords

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "landlord", "admin"],
      // set the default role to user if not specified
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(normalize);

export const UserModel = model("User", userSchema);
