import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../repository/product.model";
import { InvoiceModel } from "../../../repository/invoice.model";

export async function databaseConnect() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_invoice.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([ProductModel, InvoiceModel]);
  await sequelize.sync();
}
