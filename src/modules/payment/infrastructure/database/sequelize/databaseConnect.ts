import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../../../repository/transaction.model";

export async function databaseConnect() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_payment.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([TransactionModel]);
  await sequelize.sync();
}
