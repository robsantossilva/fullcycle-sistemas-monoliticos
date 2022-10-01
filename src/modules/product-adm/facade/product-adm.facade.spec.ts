import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
import { ProductModel as StoreCatalogProductModel } from "../../store-catalog/repository/product.model";

describe("ProductAdmFacade test", () => {
  let sequelize1: Sequelize;
  let sequelize2: Sequelize;

  beforeEach(async () => {
    sequelize1 = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize1.addModels([ProductModel]);
    await sequelize1.sync();

    sequelize2 = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize2.addModels([StoreCatalogProductModel]);
    await sequelize2.sync();
  });

  afterEach(async () => {
    await sequelize1.close();
    await sequelize2.close();
  });

  it("should create a product", async () => {
    // const productRepository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({
    //   addUseCase: addProductUseCase,
    //   stockUseCase: undefined,
    // });

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      salesPrice: 12,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });
    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });

  it("it should check the stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      salesPrice: 12,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: "1" });

    expect(result.productId).toBe(input.id);
    expect(result.stock).toBe(input.stock);
  });
});
