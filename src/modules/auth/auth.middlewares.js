import jwt from "jsonwebtoken";
import { ErrorHandler, catchError } from "../../utils/error.handler.js";
import User from "../user/models/user.model.js";
export const authenticate = (req, res, next) => {
  const token = req.header("token");
  if (!token || !token.startsWith("Bearer"))
    throw new ErrorHandler("Unauthorized", 401);
  const bearerToken = token.split(" ")[1];
  try {
    const decoded = jwt.verify(bearerToken, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ErrorHandler(error.message, 498);
  }
};
export const authorize = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) throw new ErrorHandler("Forbidden", 403);
    next();
  };
};
export const assertUniqueEmail = catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new ErrorHandler("This email is already taken", 400);
  next();
});
