import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import { ClientModel } from "../repository/client.model";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
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

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client!.name).toBe(input.name);
    expect(client!.email).toBe(input.email);
    expect(client!.document).toBe(input.document);
    expect(client!.street).toBe(input.street);
    expect(client!.number).toBe(input.number);
    expect(client!.complement).toBe(input.complement);
    expect(client!.city).toBe(input.city);
    expect(client!.state).toBe(input.state);
    expect(client!.zipCode).toBe(input.zipCode);
  });

  it("it should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
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

    await facade.add(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client!.id).toBe(input.id);
    expect(client!.name).toBe(input.name);
    expect(client!.email).toBe(input.email);
    expect(client!.document).toBe(input.document);
    expect(client!.street).toBe(input.street);
    expect(client!.number).toBe(input.number);
    expect(client!.complement).toBe(input.complement);
    expect(client!.city).toBe(input.city);
    expect(client!.state).toBe(input.state);
    expect(client!.zipCode).toBe(input.zipCode);
  });
});
