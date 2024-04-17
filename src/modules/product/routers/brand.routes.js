import { Router } from "express";
import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";
import {
  AddBrandVali,
  deleteBrandVali,
  GetBrandVali,
  updateBrandVali,
} from "../validations/brand.validations.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import { attachImage } from "../../image/middlewares/image.middleware.js";

const router = Router();

router
  .route("/")
  .get(getBrands)
  .post(
    upload.single("logo"),
    validate(AddBrandVali),
    attachImage("logo"),
    addBrand
  );
router
  .route("/:brandSlug")
  .get(validate(GetBrandVali), getBrand)
  .put(
    upload.single("logo"),
    validate(updateBrandVali),
    attachImage("logo"),
    updateBrand
  )
  .delete(validate(deleteBrandVali), deleteBrand);

export default router;
