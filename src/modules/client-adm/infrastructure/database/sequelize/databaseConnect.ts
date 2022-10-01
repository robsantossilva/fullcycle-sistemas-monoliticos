import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../repository/client.model";

export async function databaseConnect() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_client-adm.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([ClientModel]);
  await sequelize.sync();
}
