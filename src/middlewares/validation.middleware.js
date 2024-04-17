import { ErrorHandler } from "../utils/error.handler.js";
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
        ...(req.file && { file: req.file }),
        ...(req.files ? { files: req.files } : null),
      },
      { abortEarly: false }
    );
    if (error) {
      throw new ErrorHandler(
        error.details.map((d) => d.message),
        400
      );
    }
    next();
  };
};
