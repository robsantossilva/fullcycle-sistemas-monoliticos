import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
  };
};

describe("generate invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const input: GenerateInvoiceUseCaseInputDto = {
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

    const invoiceRepository = MockRepository();
    const useCase = new GenerateInvoiceUseCase(invoiceRepository);
    const result = await useCase.execute(input);

    expect(invoiceRepository.create).toHaveBeenCalledTimes(1);

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

    for (let i = 0; i < input.items.length; i++) {
      expect(input.items[i].id).toStrictEqual(result.items[i].id);
      expect(input.items[i].name).toStrictEqual(result.items[i].name);
      expect(input.items[i].price).toStrictEqual(result.items[i].price);
    }
  });
});
