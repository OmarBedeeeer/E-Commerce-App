import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { catchError } from "../../../utils/error.handler.js";
import Brand from "../models/brand.model.js";

export const getBrand = catchError(async (req, res) => {
  const { brandSlug } = req.params;
  const brand = await Brand.findOne({ slug: brandSlug });
  res.json({ brand });
});

export const getBrands = catchError(async (req, res) => {
  const apiFeatures = new ApiFeatures(Brand.find(), req.query).paginate(10);
  const brands = await apiFeatures.query;
  res.json({ brands });
});

export const addBrand = catchError(async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json({ brand });
});

export const updateBrand = catchError(async (req, res) => {
  const { brandSlug } = req.params;
  const brand = await Brand.findOneAndUpdate({ slug: brandSlug }, req.body, {
    new: true,
  });
  res.json({ brand });
});

export const deleteBrand = catchError(async (req, res) => {
  const { brandSlug } = req.params;
  const brand = await Brand.findOneAndDelete({ slug: brandSlug });
  res.json({ brand });
});
