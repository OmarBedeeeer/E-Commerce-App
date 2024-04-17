import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../controllers/coupon.controller.js";
import {
  addCopVali,
  deleteCouponVali,
  getCouponVali,
  updateCouponVali,
} from "../validations/coupon.validations.js";

const router = Router();

router
  .route("/")
  .get(authenticate, authorize(ROLES.ADMIN), getAllCoupons)
  .post(authenticate, authorize(ROLES.ADMIN), validate(addCopVali), addCoupon);

router
  .route("/:couponId")
  .get(authenticate, authorize(ROLES.ADMIN), validate(getCouponVali), getCoupon)
  .put(
    authenticate,
    authorize(ROLES.ADMIN),
    validate(updateCouponVali),
    updateCoupon
  )
  .delete(
    authenticate,
    authorize(ROLES.ADMIN),
    validate(deleteCouponVali),
    deleteCoupon
  );

export default router;
