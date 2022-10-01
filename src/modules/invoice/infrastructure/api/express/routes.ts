import express from "express";
import { invoiceRoute } from "./routes/invoice.route";

export const routes = express.Router();

routes.use(express.json());

routes.use("/invoice", invoiceRoute);
