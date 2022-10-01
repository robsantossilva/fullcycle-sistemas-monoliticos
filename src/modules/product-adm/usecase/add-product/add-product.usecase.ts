import Id from "../../../@shared/domain/value-object/id.value-object";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {
  private _productRepository: ProductGateway;
  private _catalogFacade: StoreCatalogFacadeInterface;

  constructor(
    productRepository: ProductGateway,
    catalogFacade: StoreCatalogFacadeInterface
  ) {
    this._productRepository = productRepository;
    this._catalogFacade = catalogFacade;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    const product = new Product(props);
    this._productRepository.add(product);

    this._catalogFacade.addProduct({
      id: props.id.id,
      name: props.name,
      description: props.description,
      salesPrice: input.salesPrice,
    });

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
