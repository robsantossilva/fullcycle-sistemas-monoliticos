import express from "express";
import { checkoutRoute } from "./routes/checkout.route";

export const routes = express.Router();

routes.use(express.json());

routes.use("/checkout", checkoutRoute);
