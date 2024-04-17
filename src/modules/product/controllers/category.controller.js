import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { catchError } from "../../../utils/error.handler.js";
import { makeImage } from "../../image/utils/image.utils.js";
import Category from "../models/category.model.js";

export const getCategory = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug });
  res.json({ category });
});

export const getCategories = catchError(async (req, res) => {
  const apiFeatures = new ApiFeatures(Category.find(), req.query).paginate(10);
  const categories = await apiFeatures.query;
  res.json({ categories });
});

export const addCategory = catchError(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ category });
});

export const updateCategory = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOneAndUpdate(
    { slug: categorySlug },
    req.body
  );
  res.status(201).json({ category });
});

export const deleteCategory = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOneAndDelete({
    slug: categorySlug,
  });
  res.json({ category });
});
