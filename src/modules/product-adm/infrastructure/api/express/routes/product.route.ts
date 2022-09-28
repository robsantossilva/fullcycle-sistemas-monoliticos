import express, { Request, Response } from "express";
import ProductRepository from "../../../../repository/product.repository";
import AddProductUseCase from "../../../../usecase/add-product/add-product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({
      description: req.body.description,
      name: req.body.name,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    });
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  res.send(req.query);
});
