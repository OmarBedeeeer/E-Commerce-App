import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { catchError } from "../../../utils/error.handler.js";
import { makeImage } from "../../image/utils/image.utils.js";
import ImgOnProd from "../models/imageOnProduct.js";
import Product from "../models/product.model.js";

export const getProducts = catchError(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .paginate(50)
    .fields()
    .filter()
    .search(["title", "description"])
    .sort();
  const products = await apiFeature.query;
  res.json({ products });
});

export const getProduct = catchError(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.productSlug });
  res.json({ product });
});

export const addProductWithImages = catchError(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (req.files?.images)
    await Promise.all(
      req.files.images.map(async (file) => {
        try {
          const image = await makeImage(file.path);
          await ImgOnProd.create({
            image_id: image._id,
            product_id: product._id,
          });
        } catch (error) {
          return next(error);
        }
      })
    );
  res.status(201).json({
    message: `Added product with ${req.files.images?.length || 0} images`,
  });
});

export const updateProductWithImages = catchError(async (req, res, next) => {
  if (req.files?.images) {
    const product = await Product.findOne({
      slug: req.params.productSlug,
    });
    await Promise.all(
      product.images.map(async (image) => {
        try {
          await ImgOnProd.findByIdAndDelete(image._id);
        } catch (error) {
          return next(error);
        }
      })
    );
    await Promise.all(
      req.files.images.map(async (file) => {
        try {
          const image = await makeImage(file.path);
          await ImgOnProd.create({
            image_id: image._id,
            product_id: product._id,
          });
        } catch (error) {
          return next(error);
        }
      })
    );
  }
  await Product.updateOne({}, req.body).where({ slug: req.params.productSlug });
  res.json({
    message: `Updated product with ${req.files.images?.length || 0} images`,
  });
});

export const deleteProduct = catchError(async (req, res, next) => {
  const product = await Product.findOneAndDelete({
    slug: req.params.productSlug,
  });
  res.json({ product });
});
