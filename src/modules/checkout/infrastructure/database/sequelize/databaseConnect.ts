import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "../../../repository/order.model";
import { ProductModel } from "../../../repository/product.model";

export async function databaseConnect() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_checkout.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([OrderModel, ProductModel]);
  await sequelize.sync();
}
