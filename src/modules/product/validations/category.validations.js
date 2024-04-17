import Joi from "joi";

export const getCategoryVali = Joi.object({
  body: {},
  params: { categorySlug: Joi.string().required() },
  query: {},
});

export const addCategoryVali = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim().required(),
  },
  params: {},
  query: {},
  file: Joi.object().required(),
});

export const updateCategoryVali = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
  },
  params: { categorySlug: Joi.string().required() },
  query: {},
  file: Joi.object(),
});

export const deleteCategoryVali = Joi.object({
  body: {},
  params: { categorySlug: Joi.string().required() },
  query: {},
});
