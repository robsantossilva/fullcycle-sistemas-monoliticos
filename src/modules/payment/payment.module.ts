import { databaseConnect } from "./infrastructure/database/sequelize/databaseConnect";

export default class PaymentModule {
  static init() {
    databaseConnect();
  }

  static routes() {}
}
