import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import { ProductModel } from "../repository/product.model";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import { GenerateInvoiceFacadeInputDTO } from "./invoice.facade.interface";

describe("InvoiceFacade test", () => {
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

  it("should generate a invoice", async () => {
    const repository = new InvoiceRepository();
    const facade = new InvoiceFacade({
      generateInvoiceUseCase: new GenerateInvoiceUseCase(repository),
      findInvoiceUseCase: new FindInvoiceUseCase(repository),
    });

    const input: GenerateInvoiceFacadeInputDTO = {
      id: "1",
      name: "Robson Silva",
      document: "132.456.789-09",
      street: "Rua Janeiro",
      number: "15",
      complement: "complemento",
      city: "Jandira",
      state: "SP",
      zipCode: "06600100",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 7.5,
        },
        {
          id: "2",
          name: "Product 2",
          price: 7.5,
        },
      ],
    };

    await facade.generate(input);
    const result = await InvoiceModel.findOne({ where: { id: "1" } });
    const items = await ProductModel.findAll({ where: { invoiceId: "1" } });

    expect(result.id).toBeDefined();
    expect(input.document).toBe(result.document);
    expect(input.name).toBe(result.name);
    expect(input.items.map((p) => p.price).reduce((p, c) => p + c)).toBe(
      result.total
    );

    expect(input.street).toStrictEqual(result.street);
    expect(input.number).toStrictEqual(result.number);
    expect(input.complement).toStrictEqual(result.complement);
    expect(input.city).toStrictEqual(result.city);
    expect(input.state).toStrictEqual(result.state);
    expect(input.zipCode).toStrictEqual(result.zipCode);

    for (let i = 0; i < items.length; i++) {
      expect(input.items[i].id).toStrictEqual(items[i].id);
      expect(input.items[i].name).toStrictEqual(items[i].name);
      expect(input.items[i].price).toStrictEqual(items[i].price);
    }
  });
});
