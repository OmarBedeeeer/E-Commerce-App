import { catchError } from "../../../utils/error.handler.js";
import Cart from "../models/cart.model.js";

export const assertCart = catchError(async (req, res, next) => {
  const cart = await Cart.findOne({ user_id: req.user.id });
  if (cart) return next();

  await Cart.create({ user_id: req.user.id, products: [] });
  next();
});
