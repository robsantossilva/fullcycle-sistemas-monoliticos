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
            address: "Address 1",
        };

        const result = await useCase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    });
});