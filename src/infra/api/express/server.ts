import express, { Express } from "express";
import dotenv from "dotenv";

import ProductAdmModule from "../../../modules/product-adm/product-adm.module";
import StoreCatalogModule from "../../../modules/store-catalog/store-catalog.module";
import ClientAdmModule from "../../../modules/client-adm/client-adm.module";
import PaymentModule from "../../../modules/payment/payment.module";
import InvoiceModule from "../../../modules/invoice/invoice.module";
import CheckoutModule from "../../../modules/checkout/checkout.module";

dotenv.config();

const port: Number = Number(process.env.PORT) || 3000;
const app: Express = express();

CheckoutModule.init();
ClientAdmModule.init();
InvoiceModule.init();
PaymentModule.init();
ProductAdmModule.init();
StoreCatalogModule.init();

app.use(ProductAdmModule.routes());
app.use(ClientAdmModule.routes());
app.use(CheckoutModule.routes());
app.use(InvoiceModule.routes());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
