import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ErrorHandler, catchError } from "../../utils/error.handler.js";
import User from "../user/models/user.model.js";
import sendmail from "../../middlewares/emailsender.js";

export const signin = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password))
    throw new ErrorHandler("Invalid credentials", 400);
  const { name, role, _id: id } = user;
  const token = jwt.sign({ name, role, id, email }, process.env.SECRET);
  res.json({ token });
});

export const signup = catchError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne(email);
  if (user) throw new ErrorHandler("user Already Exist", 400);
  const hashed = bcrypt.hashSync(password, +process.env.SALT);
  const token = jwt.sign({ email }, process.env.SECRET, {
    expiresIn: "5min",
  });

  await User.create({
    name,
    email,
    password: hashed,
  });

  const createLink = `http://localhost:3000/users/verify/${token}`;

  const message = await sendmail({
    to: email,
    subject: "Verify your account",
    text: createLink,
  });

  res.status(201).json({ message: "Signed up successfully" });
});

export const verfyEmail = catchError(async (req, res) => {
  const { token } = req.params;
  const { email } = jwt.verify(token, process.env.SECRET);

  const user = await User.findOne(email);

  if (!user) throw new ErrorHandler("User not found", 404);

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  );

  if (updatedUser) return res.status(200).json({ message: "Email verified" });

  throw new ErrorHandler("Something went wrong", 500);
});

export const forgetPassword = catchError(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler("User not found", 404);

  const token = jwt.sign({ email }, process.env.SECRET, {
    expiresIn: "5min",
  });
  const forgetPasswordLink = `http://localhost:3000/users/reset/${token}`;

  const sendmailer = await sendmail({
    to: email,
    subject: "Reset your password",
    text: forgetPasswordLink,
  });
  res.status(200).json({ message: "Email sent successfully" });
});
