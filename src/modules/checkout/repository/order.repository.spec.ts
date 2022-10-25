import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";
import OrderRepository from "./order.repository";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";

const mockData = new Date(2000, 1, 1);

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(mockData);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should create a order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      document: "12345678989",
      street: "Rua Janeiro",
      number: "15",
      complement: "complemento",
      city: "Jandira ",
      state: "SP",
      zipCode: "12345698",
    });

    const product = new Product({
      id: new Id("2"),
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    });

    const order = new Order({
      id: new Id("3"),
      client,
      products: [product],
    });

    const repository = new OrderRepository();
    await repository.addOrder(order);

    const orderDb = await OrderModel.findOne({
      where: { id: order.id.id },
    });

    const productsDb = await ProductModel.findAll({
      where: { orderId: order.id.id },
    });

    expect(orderDb).toBeDefined();
    expect(orderDb.id).toBe(order.id.id);
    expect(orderDb.name).toBe(order.client.name);
    expect(orderDb.email).toBe(order.client.email);
    expect(orderDb.document).toBe(order.client.document);
    expect(orderDb.street).toBe(order.client.street);
    expect(orderDb.number).toBe(order.client.number);
    expect(orderDb.complement).toBe(order.client.complement);
    expect(orderDb.city).toBe(order.client.city);
    expect(orderDb.state).toBe(order.client.state);
    expect(orderDb.zipCode).toBe(order.client.zipCode);
    expect(orderDb.total).toBe(order.total);
    expect(orderDb.status).toBe(order.status);
    expect(orderDb.createdAt).toStrictEqual(order.createdAt);
    expect(orderDb.updatedAt).toStrictEqual(order.updatedAt);

    expect(productsDb[0].productId).toBe(product.id.id);
    expect(productsDb[0].name).toBe(product.name);
    expect(productsDb[0].description).toBe(product.description);
    expect(productsDb[0].salesPrice).toBe(product.salesPrice);
  });
});
