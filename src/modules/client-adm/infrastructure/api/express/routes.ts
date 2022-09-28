import express from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../repository/client.model";
import { clientRoute } from "./routes/client.route";

export const routes = express.Router();

routes.use(express.json());

routes.use("/clients", clientRoute);

async function setupDb() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_client-adm_1.sqlite",
    // storage: ":memory:",
    logging: true,
    sync: {
      //force: true
    },
  });

  await sequelize.addModels([ClientModel]);
  await sequelize.sync();
}
setupDb();
