import { catchError } from "../../../utils/error.handler.js";
import { makeImage } from "../utils/image.utils.js";

export const attachImage = (fieldName) =>
  catchError(async (req, res, next) => {
    if (!req.file) return next();
    const image = await makeImage(req.file.path);
    req.body[fieldName] = image._id;
    next();
  });
