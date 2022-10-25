import express, { Request, Response } from "express";
import InvoiceRepository from "../../../../repository/invoice.repository";
import FindInvoiceUseCase from "../../../../usecase/find-invoice/find-invoice.usecase";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const usecase = new FindInvoiceUseCase(new InvoiceRepository());
    const invoice = await usecase.execute({
      id,
    });
    res.send(invoice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

invoiceRoute.get("/", async (req: Request, res: Response) => {
  let id = null;
  if (req.query.id) {
    id = req.query.id.toString();
  }
  try {
    const usecase = new FindInvoiceUseCase(new InvoiceRepository());
    const invoice = await usecase.execute({
      id,
    });
    res.send(invoice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
