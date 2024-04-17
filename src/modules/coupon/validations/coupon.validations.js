import Joi from "joi";
import { schemas } from "../../../utils/schema.js";

export const addCopVali = Joi.object({
  body: {
    code: Joi.string().min(3).max(200).trim().required(),
    expiry: Joi.date().required(),
    discount: Joi.number().required(),
  },
  params: {},
  query: {},
});

export const updateCouponVali = Joi.object({
  body: {
    code: Joi.string().min(3).max(200).trim(),
    expiry: Joi.date(),
    discount: Joi.number(),
  },
  params: {
    couponId: schemas.modelId.required(),
  },
  query: {},
});

export const getCouponVali = Joi.object({
  body: {},
  params: {
    couponId: schemas.modelId.required(),
  },
  query: {},
});

export const deleteCouponVali = Joi.object({
  body: {},
  params: {
    couponId: schemas.modelId.required(),
  },
  query: {},
});
