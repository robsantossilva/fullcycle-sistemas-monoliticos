import { databaseConnect } from "./infrastructure/database/sequelize/databaseConnect";
import { routes } from "./infrastructure/api/express/routes";

export default class ClientAdmModule {
  static init() {
    databaseConnect();
  }

  static routes() {
    return routes;
  }
}
