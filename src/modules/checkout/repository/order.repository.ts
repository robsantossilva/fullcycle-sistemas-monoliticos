import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

export default class OrderRepository implements CheckoutGateway {
  findOrder(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async addOrder(order: Order): Promise<void> {
    await Promise.all(
      order.products.map((p) =>
        ProductModel.create({
          id: p.id.id,
          orderId: order.id.id,
          name: p.name,
          description: p.description,
          salesPrice: p.salesPrice,
        })
      )
    );

    await OrderModel.create({
      id: order.id.id,
      name: order.client.name,
      email: order.client.email,
      document: order.client.document,
      street: order.client.street,
      number: order.client.number,
      complement: order.client.complement,
      city: order.client.city,
      state: order.client.state,
      zipCode: order.client.zipCode,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }
}
