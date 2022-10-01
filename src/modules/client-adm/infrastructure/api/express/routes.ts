import express from "express";
import { databaseConnect } from "../../database/sequelize/databaseConnect";
import { clientRoute } from "./routes/client.route";

export const routes = express.Router();

routes.use(express.json());

routes.use("/clients", clientRoute);

databaseConnect();
