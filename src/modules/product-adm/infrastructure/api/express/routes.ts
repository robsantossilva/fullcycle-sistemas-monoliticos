import express from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../repository/product.model";
import { productRoute } from "./routes/product.route";

export const routes = express.Router();

routes.use(express.json());

routes.use("/products", productRoute);

async function setupDb() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_product-adm_1.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([ProductModel]);
  await sequelize.sync();
}
setupDb();
