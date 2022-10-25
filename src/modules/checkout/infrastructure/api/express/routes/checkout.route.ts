import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../../../client-adm/factory/facade.factory";
import InvoiceFacadeFactory from "../../../../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../../../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../../../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../../../store-catalog/factory/facade.factory";
import OrderRepository from "../../../../repository/order.repository";
import PlaceOrderUseCase from "../../../../usecase/place-order/place-order.usecase";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const repository = new OrderRepository();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();

  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    repository,
    invoiceFacade,
    paymentFacade
  );
  try {
    /*
    {
      "clientId": 1,
      "products": [
        123,
        321,
        456
      ]
    }
    */
    const output = await usecase.execute({
      clientId: req.body.clientId,
      products: req.body.products.map((id: number) => ({
        productId: id,
      })),
    });
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

checkoutRoute.get("/", async (req: Request, res: Response) => {
  res.send(req.query);
});
