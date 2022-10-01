import express, { Request, Response } from "express";
import StoreCatalogFacadeFactory from "../../../../../store-catalog/factory/facade.factory";
import ProductRepository from "../../../../repository/product.repository";
import AddProductUseCase from "../../../../usecase/add-product/add-product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const storeCatalogFacade = StoreCatalogFacadeFactory.create();
  const usecase = new AddProductUseCase(
    new ProductRepository(),
    storeCatalogFacade
  );
  try {
    const output = await usecase.execute({
      description: req.body.description,
      name: req.body.name,
      purchasePrice: req.body.purchasePrice,
      salesPrice: req.body.salesPrice,
      stock: req.body.stock,
    });
    res.send(output);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  res.send(req.query);
});
