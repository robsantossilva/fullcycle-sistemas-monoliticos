import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(
      productRepository,
      storeCatalogFacade
    );
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });

    return productFacade;
  }
}
