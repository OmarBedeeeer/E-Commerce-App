import Joi from "joi";

export const getReviewVali = Joi.object({
  body: {},
  params: {
    productSlug: Joi.string().required(),
  },
  query: {},
});

export const addReviewVali = Joi.object({
  body: {
    text: Joi.string().min(3).max(200).trim().required(),
    rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
  },
  params: {
    productSlug: Joi.string().required(),
  },
  query: {},
});

export const updateReviewVali = Joi.object({
  body: {
    text: Joi.string().min(3).max(200).trim(),
    rating: Joi.number().valid(1, 2, 3, 4, 5),
  },
  params: { productSlug: Joi.string().required() },
  query: {},
});

export const deleteReviewVali = Joi.object({
  body: {},
  params: { productSlug: Joi.string().required() },
  query: {},
});
