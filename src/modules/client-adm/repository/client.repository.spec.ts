import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

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

    await sequelize.addModels([ClientModel]);
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

  it("should create a client", async () => {
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: client.id.id },
    });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document);
    expect(clientDb.street).toBe(client.street);
    expect(clientDb.number).toBe(client.number);
    expect(clientDb.complement).toBe(client.complement);
    expect(clientDb.city).toBe(client.city);
    expect(clientDb.state).toBe(client.state);
    expect(clientDb.zipCode).toBe(client.zipCode);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  });

  it("should find a client", async () => {
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

    const repository = new ClientRepository();
    await repository.add(client);

    const result = await repository.find("1");

    expect(result).toBeDefined();
    expect(result.id.id).toBe(client.id.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.document).toBe(client.document);
    expect(result.street).toBe(client.street);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.zipCode).toBe(client.zipCode);
  });
});
