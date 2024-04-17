import express from "express";
import morgan from "morgan";
import { ErrorHandler } from "./utils/error.handler.js";
import categoryRouter from "./modules/product/routers/category.routes.js";
import subcategoryRouter from "./modules/product/routers/subcategory.routes.js";
import brandRouter from "./modules/product/routers/brand.routes.js";
import productRouter from "./modules/product/routers/product.routes.js";
import cartsRouter from "./modules/cart/routers/cart.routes.js";
import couponsRouter from "./modules/coupon/routers/coupon.routes.js";
import authRouter from "./modules/auth/auth.routes.js";

const bootstrap = (app) => {
  app.use(express.json());
  app.use(categoryRouter);
  app.use(subcategoryRouter);
  app.use(productRouter);
  app.use(brandRouter);
  app.use(couponsRouter);
  app.use(cartsRouter);
  app.use(authRouter);
  app.use(morgan("dev"));
  app.all("*", (req, res, next) => {
    throw new ErrorHandler("Route not found", 404);
  });

  app.use((err, req, res, next) => {
    const { message, status, stack } = err;
    res.status(status || 500).json({
      message,
      ...(process.env.MODE === "development" && { stack }),
    });
  });
};

export default bootstrap;
