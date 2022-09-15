import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.vo";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";
import FindInvoiceUseCase from "./find-invoice.usecase";

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

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("find invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input: FindInvoiceUseCaseInputDTO = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(result.document).toBe(invoice.document);
    expect(result.name).toBe(invoice.name);
    expect(result.total).toBe(invoice.total);
    expect(result.createdAt).toStrictEqual(invoice.createdAt);

    expect(result.address.street).toStrictEqual(invoice.address.street);
    expect(result.address.number).toStrictEqual(invoice.address.number);
    expect(result.address.complement).toStrictEqual(invoice.address.complement);
    expect(result.address.city).toStrictEqual(invoice.address.city);
    expect(result.address.state).toStrictEqual(invoice.address.state);
    expect(result.address.zipCode).toStrictEqual(invoice.address.zipCode);

    for (let i = 0; i < result.items.length; i++) {
      expect(result.items[i].id).toStrictEqual(invoice.items[i].id.id);
      expect(result.items[i].name).toStrictEqual(invoice.items[i].name);
      expect(result.items[i].price).toStrictEqual(invoice.items[i].price);
    }
  });
});
