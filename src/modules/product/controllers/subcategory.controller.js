import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { catchError } from "../../../utils/error.handler.js";
import Category from "../models/category.model.js";
import Subcategory from "../models/subcategory.model.js";

export const getSubcategory = catchError(async (req, res) => {
  const { subcategorySlug, categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) res.status(404).json({ message: "Category not found" });
  const subcategory = await Subcategory.findOne({
    slug: subcategorySlug,
    category_id: category._id,
  });
  res.json({ subcategory });
});

export const getSubcategories = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) res.status(404).json({ message: "Category not found" });
  const apiFeatures = new ApiFeatures(
    Subcategory.find({ category_id: category._id }),
    req.query
  ).paginate(10);
  const subcategories = await apiFeatures.query;
  res.json({ subcategories });
});

export const addSubcategory = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) res.status(404).json({ message: "Category not found" });
  const subcategory = await Subcategory.create({
    ...req.body,
    category_id: category._id,
  });
  res.status(201).json({ subcategory });
});

export const updateSubcategory = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) res.status(404).json({ message: "Category not found" });
  const { subcategorySlug } = req.params;
  const subcategory = await Subcategory.findOneAndUpdate(
    { slug: subcategorySlug, category_id: category._id },
    req.body
  );
  res.status(201).json({ subcategory });
});

export const deleteSubcategory = catchError(async (req, res) => {
  const { categorySlug } = req.params;
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) res.status(404).json({ message: "Category not found" });
  const { subcategorySlug } = req.params;
  const subcategory = await Subcategory.findOneAndDelete({
    slug: subcategorySlug,
    category_id: category._id,
  });
  res.json({ subcategory });
});
