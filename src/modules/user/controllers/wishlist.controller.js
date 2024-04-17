import { catchError } from "../../../utils/error.handler.js";
import User from "../models/user.model.js";

export const getWishlist = catchError(async (req, res) => {
  const { wishlist } = await User.findById(req.user.id);
  res.json({ wishlist });
});

export const updateWishlist = catchError(async (req, res) => {
  const { product_id } = req.body;
  const user = await User.findById(req.user.id);

  const indexOfProduct = user.wishlist.findIndex(
    ({ _id }) => _id.toString() === product_id
  );

  if (indexOfProduct === -1) user.wishlist.push(product_id);
  else user.wishlist.splice(indexOfProduct, 1);

  await user.save();

  res.json({ message: "Wishlist updated successfully" });
});
