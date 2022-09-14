import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.vo";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    });

    let total: number = 0;
    const items: Product[] = input.items.map((p) => {
      total += p.price;
      return new Product({
        id: new Id(p.id),
        name: p.name,
        price: p.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    const invoice = new Invoice({
      id: new Id(),
      document: input.document,
      name: input.name,
      total,
      address,
      items,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this._invoiceRepository.create(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((p) => ({
        id: p.id.id,
        name: p.name,
        price: p.price,
      })),
      total: invoice.total,
    };
  }
}
