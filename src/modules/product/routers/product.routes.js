import { Router } from "express";
import { validate } from "../../../middlewares/validation.middleware.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import {
  addProductVali,
  deleteProductVali,
  getProductVali,
  updateProductVali,
} from "../validations/products.validations.js";
import {
  addProductWithImages,
  deleteProduct,
  getProduct,
  getProducts,
  updateProductWithImages,
} from "../controllers/product.controller.js";
import { attachCoverImage } from "../middlewares/product.middlewares.js";
import reviewRouter from "./review.routes.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 8 },
    ]),
    validate(addProductVali),
    attachCoverImage(),
    addProductWithImages
  );

router
  .route("/:productSlug")
  .get(validate(getProductVali), getProduct)
  .put(
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 8 },
    ]),
    validate(updateProductVali),
    attachCoverImage(),
    updateProductWithImages
  )
  .delete(validate(deleteProductVali), deleteProduct);

router.use("/:productSlug/reviews", reviewRouter);

export default router;
