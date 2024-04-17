import Joi from "joi";

export const GetBrandVali = Joi.object({
  body: {},
  params: { brandSlug: Joi.string().required() },
  query: {},
});

export const AddBrandVali = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim().required(),
  },
  params: {},
  query: {},
  file: Joi.object().required(),
});

export const updateBrandVali = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
  },
  params: { brandSlug: Joi.string().required() },
  query: {},
  file: Joi.object(),
});

export const deleteBrandVali = Joi.object({
  body: {},
  params: { brandSlug: Joi.string().required() },
  query: {},
});
