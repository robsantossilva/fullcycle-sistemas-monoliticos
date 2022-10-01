import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../repository/product.model";

export async function databaseConnect() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_store-catalog.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([ProductModel]);
  await sequelize.sync();
}
