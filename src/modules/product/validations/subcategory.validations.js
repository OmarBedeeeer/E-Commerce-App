import Joi from "joi";

export const getSubcategoriesVali = Joi.object({
  body: {},
  params: {
    categorySlug: Joi.string().required(),
  },
  query: {},
});

export const getSubcategorySchema = Joi.object({
  body: {},
  params: {
    subcategorySlug: Joi.string().required(),
    categorySlug: Joi.string().required(),
  },
  query: {},
});

export const addSubcategoryVali = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim().required(),
  },
  params: { categorySlug: Joi.string().required() },
  query: {},
});

export const updateSubcategoryVali = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
  },
  params: {
    subcategorySlug: Joi.string().required(),
    categorySlug: Joi.string().required(),
  },
  query: {},
});

export const deleteSubcategoryVali = Joi.object({
  body: {},
  params: {
    subcategorySlug: Joi.string().required(),
    categorySlug: Joi.string().required(),
  },
  query: {},
});
