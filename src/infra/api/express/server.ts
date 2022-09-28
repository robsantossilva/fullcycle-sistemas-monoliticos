import express, { Express } from "express";
import dotenv from "dotenv";
import { routes as productAdmRoutes } from "../../../modules/product-adm/infrastructure/api/express/routes";
import { routes as clientAdmRoute } from "../../../modules/client-adm/infrastructure/api/express/routes";

dotenv.config();

const port: Number = Number(process.env.PORT) || 3000;
const app: Express = express();

app.use(productAdmRoutes);
app.use(clientAdmRoute);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
