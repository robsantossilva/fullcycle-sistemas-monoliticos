import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.vo";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
  async create(invoice: Invoice): Promise<void> {
    const newInvoice = await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      total: invoice.total,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const productModelPromises = invoice.items.map((product) =>
      ProductModel.create({
        id: new Id().id,
        productId: product.id.id,
        invoiceId: invoice.id.id,
        name: product.name,
        price: product.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await Promise.all(productModelPromises);
  }
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
    });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    const products = await ProductModel.findAll({
      where: {
        invoiceId: id,
      },
    });

    if (!products) {
      throw new Error(`Products for invoice id ${id} not found`);
    }

    return new Invoice({
      id: new Id(invoice.id),
      address: new Address({
        city: invoice.city,
        state: invoice.state,
        complement: invoice.complement,
        number: invoice.number,
        street: invoice.street,
        zipCode: invoice.zipCode,
      }),
      document: invoice.document,
      name: invoice.name,
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      items: products.map(
        (p) =>
          new Product({
            id: new Id(p.productId),
            name: p.name,
            price: p.price,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          })
      ),
    });
  }
}
