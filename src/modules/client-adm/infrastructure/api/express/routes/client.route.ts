import express, { Request, Response } from "express";
import ClientRepository from "../../../../repository/client.repository";
import AddClientUseCase from "../../../../usecase/add-client/add-client.usecase";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddClientUseCase(new ClientRepository());
  try {
    const output = await usecase.execute({
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    });
    res.send(output);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

clientRoute.get("/", async (req: Request, res: Response) => {
  res.send(req.query);
});
