import { routes } from "./infrastructure/api/express/routes";
import { databaseConnect } from "./infrastructure/database/sequelize/databaseConnect";

export default class CheckoutModule {
  static init() {
    databaseConnect();
  }

  static routes() {
    return routes;
  }
}
