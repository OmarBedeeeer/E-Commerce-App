import Joi from "joi";
export const signinVali = Joi.object({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
  params: {},
  query: {},
});
export const signupVali = Joi.object({
  body: {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  },
  params: {},
  query: {},
});
export const emailVali = Joi.object({
  body: {},
  params: {
    token: Joi.string().hex().length(24),
  },
  query: {},
});
