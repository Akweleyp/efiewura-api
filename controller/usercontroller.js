import { UserModel } from "../model/usermodel.js";
import { emailMessage, mailTransporter } from "../utils/mailing.js";
// import {email}

import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../validator/uservalidator.js";

import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

// register new user (tenant/ landlord )
export const registerUser = async (req, res) => {
  // Validate user information
  const { error, value } = registerUserValidator.validate(req.body);

  if (error) {
    return res.status(404).json(error);
  }

  // Check if user does not exist in database already
  const user = await UserModel.findOne({
    $or: [{ email: value.email }],
  });

  if (user) {
    return res.status(409).json("User already exists");
  }

  //   Create a hashed password for the user
  const hashedPassword = bcypt.hashSync(value.password, 10);

  //  Create record in database
  const newUser = await UserModel.create({
    ...value,
    password: hashedPassword,
  });

  // Generate access token for user
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
   return res.status(201).json({ newUser, token });

  // Save user information in the database (not necessary to do this becasue of previous step)
  await newUser.save();

  // Send registration confirmation email
  await mailTransporter.sendMail({
    from: process.env.USER_GMAIL,
    to: value.email,
    subject: "Welcome to Efiewura",
    html: emailMessage.replace("{{lastName}}", value.lastName)
  })

  //  Return response
  return res.status(201).json({message: "User registered successfully"})
};

// Login users( tenant / landlord)
export const loginUser = async (req, res) => {
  try {
    // Validate user information
    const { error, value } = await loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    // Check for a matching record in the database

    const user = await UserModel.findOne({
      $or: [{ email: value.email }],
    });

    if (!user) {
      return res.status(404).json("User does not exist");
    }

    // Compare incoming password with saved password in database
    const correctPassword = bcypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).json("Incorrect details, kindly try again");
    }

    // Generate access token for user( role is assigned to only the landlord)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    // Return response
     return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  // Validate request body
  try {
    const { error, value } = updateUserValidator.validate(req.body);
    // If there is an error return error
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Check if password is being updated

    if (value.password) {
      // Hash the new password
      const hashedpassword = await bcypt.hash(value.password, 10);
      value.password = hashedPassword;
    }

    // Update user in database
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    // If user is not found
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the response without password ( this will make the person't details show without their password)

    const { password, ...userWithoutPassword } = updateUser.toObject();
     return res
      .status(200)
      .json({ message: "Update successful", data: userWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ message: " An error occured during the update" });
  }
};

// Get all users

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
     return res.json(users);
  } catch (error) {
     return res.json({ message: "Unable to get users" });
  }
};
