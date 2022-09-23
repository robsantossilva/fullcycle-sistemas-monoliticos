import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client usecase unit test", () => {
  it("should add a Client", async () => {
    const clientRepository = MockRepository();
    const useCase = new AddClientUseCase(clientRepository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      document: "12345678989",
      street: "Rua Janeiro",
      number: "15",
      complement: "complemento",
      city: "Jandira ",
      state: "SP",
      zipCode: "12345698",
    };

    const result = await useCase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
  });
});
