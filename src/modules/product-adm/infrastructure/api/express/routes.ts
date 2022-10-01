import express from "express";
import { databaseConnect } from "../../database/sequelize/databaseConnect";
import { productRoute } from "./routes/product.route";

export const routes = express.Router();

routes.use(express.json());

routes.use("/products", productRoute);

databaseConnect();
