import { Router } from "express";
import {
  forgetPassword,
  signin,
  signup,
  verfyEmail,
} from "./auth.controller.js";
import { assertUniqueEmail } from "./auth.middlewares.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { signinVali, signupVali, emailVali } from "./auth.validate.js";
const router = Router();
router.post("/signin", validate(signinVali), signin);
router.post("/signup", validate(signupVali), assertUniqueEmail, signup);
router.post("/reset", forgetPassword);
router.get("/verify/:token", verfyEmail);
export default router;
