import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { catchError } from "../../../utils/error.handler.js";
import Coupon from "../models/coupon.model.js";

export const addCoupon = catchError(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ coupon });
});

export const getAllCoupons = catchError(async (req, res) => {
  const apiFeatures = new ApiFeatures(Coupon.find(), req.query).paginate(10);
  const coupons = await apiFeatures.query;
  res.status(201).json({ coupons });
});

export const getCoupon = catchError(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await Coupon.findById(couponId);
  if (coupon) {
    return res.json({ coupon });
  }
  res.status(404).json({ error: "Coupon not found" });
});

export const updateCoupon = catchError(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await Coupon.findByIdAndUpdate(couponId, req.body, {
    new: true,
  });

  if (coupon) {
    return res.json({ coupon });
  }
  res.status(404).json({ error: "Coupon not found" });
});

export const deleteCoupon = catchError(async (req, res) => {
  const couponId = req.params.id;

  const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

  if (deletedCoupon) {
    return res.json({ message: "Coupon deleted successfully" });
  }
  res.status(404).json({ error: "Coupon not found" });
});
