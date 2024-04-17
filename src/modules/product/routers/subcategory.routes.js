import { Router } from "express";
import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addSubcategoryVali,
  deleteSubcategoryVali,
  getSubcategoriesVali,
  updateSubcategoryVali,
} from "../validations/subcategory.validations.js";
import {
  addSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
} from "../controllers/subcategory.controller.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(validate(getSubcategoriesVali), getSubcategories)
  .post(validate(addSubcategoryVali), addSubcategory);

router
  .route("/:subcategorySlug")
  .get(validate(getSubcategoriesVali), getSubcategory)
  .put(validate(updateSubcategoryVali), updateSubcategory)
  .delete(validate(deleteSubcategoryVali), deleteSubcategory);

export default router;
