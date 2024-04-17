import { Router } from "express";
import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/review.controller.js";
import {
  addReviewVali,
  deleteReviewVali,
  getReviewVali,
  updateReviewVali,
} from "../validations/review.validations.js";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(validate(getReviewVali), getReviews)
  .post(authenticate, authorize(ROLES.USER), validate(addReviewVali), addReview)
  .put(
    authenticate,
    authorize(ROLES.USER),
    validate(updateReviewVali),
    updateReview
  )
  .delete(
    authenticate,
    authorize(ROLES.USER),
    validate(deleteReviewVali),
    deleteReview
  );

export default router;
