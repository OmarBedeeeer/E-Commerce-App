import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { ErrorHandler, catchError } from "../../../utils/error.handler.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

export const getReviews = catchError(async (req, res) => {
  const { productSlug } = req.params;
  const product = await Product.findOne({ slug: productSlug });
  if (!product) throw new ErrorHandler("Invalid product slug", 404);
  const apiFeatures = new ApiFeatures(Review.find(), req.query).paginate(10);
  const reviews = await apiFeatures.query;
  res.json({ reviews });
});

export const addReview = catchError(async (req, res) => {
  const { productSlug } = req.params;
  const product = await Product.findOne({ slug: productSlug });
  if (!product) throw new ErrorHandler("Invalid product slug", 404);

  const addedReview = await Review.findOne({
    user_id: req.user.id,
    product_id: product._id,
  });

  if (addedReview) throw new ErrorHandler("Review already exists", 400);

  const review = await Review.create({
    ...req.body,
    user_id: req.user.id,
    product_id: product._id,
  });
  res.json({ review });
});

export const updateReview = catchError(async (req, res) => {
  const { productSlug } = req.params;
  const product = await Product.findOne({ slug: productSlug });
  if (!product) throw new ErrorHandler("Invalid product slug", 404);

  const review = await Review.findOneAndUpdate(
    {
      user_id: req.user.id,
      product_id: product._id,
    },
    req.body
  );

  if (!review) throw new ErrorHandler("Review doesn't exist", 404);

  res.json({ review });
});

export const deleteReview = catchError(async (req, res) => {
  const { productSlug } = req.params;
  const product = await Product.findOne({ slug: productSlug });
  if (!product) res.status(404).json({ message: "Product not found" });
  const review = await Review.findByIdAndDelete({
    product_id: product._id,
    user_id: req.user.id,
  });
  res.json({ review });
});
