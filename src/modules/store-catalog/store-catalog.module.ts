import { databaseConnect } from "./infrastructure/database/sequelize/databaseConnect";

export default class StoreCatalogModule {
  static init() {
    databaseConnect();
  }

  static routes() {}
}
