import { uploadImage } from "../../../utils/image.js";
import Img from "../models/image.model.js";

export const makeImage = async (path) => {
  const { imageName, imageUrl } = await uploadImage(path);
  return await Img.create({ name: imageName, path: imageUrl });
};
