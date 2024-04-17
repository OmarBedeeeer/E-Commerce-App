import { Router } from "express";
import { validate } from "../../../middlewares/validation.middleware.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  addCategoryVali,
  deleteCategoryVali,
  getCategoryVali,
  updateCategoryVali,
} from "../validations/category.validations.js";
import subcategoryRouter from "./subcategory.routes.js";
import { attachImage } from "../../image/middlewares/image.middleware.js";

const router = Router();

router
  .route("/")
  .get(getCategories)
  .post(
    upload.single("image"),
    validate(addCategoryVali),
    attachImage("image"),
    addCategory
  );

router
  .route("/:categorySlug")
  .get(validate(getCategoryVali), getCategory)
  .put(
    upload.single("image"),
    validate(updateCategoryVali),
    attachImage("image"),
    updateCategory
  )
  .delete(validate(deleteCategoryVali), deleteCategory);

router.use("/:categorySlug/subcategories", subcategoryRouter);

export default router;
