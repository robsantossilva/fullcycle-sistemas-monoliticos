export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
}
export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>;

  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;

  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
