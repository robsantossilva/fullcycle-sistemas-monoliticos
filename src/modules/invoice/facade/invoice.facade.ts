import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDTO,
} from "./invoice.facade.interface";

export interface UseCasesProps {
  findInvoiceUseCase: UseCaseInterface;
  generateInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade {
  private _generateInvoiceUseCase: UseCaseInterface;
  private _findInvoiceUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._findInvoiceUseCase = usecasesProps.findInvoiceUseCase;
    this._generateInvoiceUseCase = usecasesProps.generateInvoiceUseCase;
  }

  async generate(input: GenerateInvoiceFacadeInputDTO): Promise<void> {
    await this._generateInvoiceUseCase.execute(input);
  }
  async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findInvoiceUseCase.execute(input);
  }
}
