import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.vo";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import { ProductModel } from "./product.model";

const mockData = new Date(2000, 1, 1);

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
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

  it("should create a invoice", async () => {
    const address = new Address({
      street: "Rua Teste",
      number: "123",
      complement: "Complemento Teste",
      city: "Jandira",
      state: "SP",
      zipCode: "65522023",
    });
    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      price: 10.51,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      price: 9.48,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const items: Product[] = [product1, product2];

    const invoice = new Invoice({
      id: new Id("1"),
      document: "12345678909",
      name: "Robson Silva",
      total: 19.99,
      address,
      items,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repo = new InvoiceRepository();
    await repo.create(invoice);

    const [invoiceDb, itemsDb] = await Promise.all([
      InvoiceModel.findOne({
        where: {
          id: invoice.id.id,
        },
      }),
      ProductModel.findAll({
        where: {
          invoiceId: invoice.id.id,
        },
      }),
    ]);

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.id).toBe(invoice.id.id);
    expect(invoiceDb.document).toBe(invoice.document);
    expect(invoiceDb.name).toBe(invoice.name);
    expect(invoiceDb.total).toBe(invoice.total);
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);

    expect(invoiceDb.street).toStrictEqual(invoice.address.street);
    expect(invoiceDb.number).toStrictEqual(invoice.address.number);
    expect(invoiceDb.complement).toStrictEqual(invoice.address.complement);
    expect(invoiceDb.city).toStrictEqual(invoice.address.city);
    expect(invoiceDb.state).toStrictEqual(invoice.address.state);
    expect(invoiceDb.zipCode).toStrictEqual(invoice.address.zipCode);

    for (let i = 0; i < itemsDb.length; i++) {
      expect(itemsDb[i].productId).toStrictEqual(invoice.items[i].id.id);
      expect(itemsDb[i].name).toStrictEqual(invoice.items[i].name);
      expect(itemsDb[i].price).toStrictEqual(invoice.items[i].price);
      expect(itemsDb[i].createdAt).toStrictEqual(invoice.items[i].createdAt);
      expect(itemsDb[i].updatedAt).toStrictEqual(invoice.items[i].updatedAt);
    }
  });

  it("should find a invoice", async () => {
    const address = new Address({
      street: "Rua Teste",
      number: "123",
      complement: "Complemento Teste",
      city: "Jandira",
      state: "SP",
      zipCode: "65522023",
    });
    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      price: 10.51,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      price: 9.48,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const items: Product[] = [product1, product2];

    const invoice = new Invoice({
      id: new Id("1"),
      document: "12345678909",
      name: "Robson Silva",
      total: 19.99,
      address,
      items,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repo = new InvoiceRepository();
    await repo.create(invoice);

    const invoiceFind = await repo.find("1");

    expect(invoiceFind).toBeDefined();
    expect(invoiceFind.id.id).toBe(invoice.id.id);
    expect(invoiceFind.document).toBe(invoice.document);
    expect(invoiceFind.name).toBe(invoice.name);
    expect(invoiceFind.total).toBe(invoice.total);
    expect(invoiceFind.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceFind.updatedAt).toStrictEqual(invoice.updatedAt);

    expect(invoiceFind.address.street).toStrictEqual(invoice.address.street);
    expect(invoiceFind.address.number).toStrictEqual(invoice.address.number);
    expect(invoiceFind.address.complement).toStrictEqual(
      invoice.address.complement
    );
    expect(invoiceFind.address.city).toStrictEqual(invoice.address.city);
    expect(invoiceFind.address.state).toStrictEqual(invoice.address.state);
    expect(invoiceFind.address.zipCode).toStrictEqual(invoice.address.zipCode);

    for (let i = 0; i < invoiceFind.items.length; i++) {
      expect(invoiceFind.items[i].id.id).toStrictEqual(invoice.items[i].id.id);
      expect(invoiceFind.items[i].name).toStrictEqual(invoice.items[i].name);
      expect(invoiceFind.items[i].price).toStrictEqual(invoice.items[i].price);
      expect(invoiceFind.items[i].createdAt).toStrictEqual(
        invoice.items[i].createdAt
      );
      expect(invoiceFind.items[i].updatedAt).toStrictEqual(
        invoice.items[i].updatedAt
      );
    }
  });
});
