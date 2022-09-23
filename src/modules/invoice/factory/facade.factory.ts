import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacade {
    const repository = new InvoiceRepository();
    return new InvoiceFacade({
      generateInvoiceUseCase: new GenerateInvoiceUseCase(repository),
      findInvoiceUseCase: new FindInvoiceUseCase(repository),
    });
  }
}
