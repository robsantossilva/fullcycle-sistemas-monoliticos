import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import StoreCatalogFacadeInterface, {
    FindAllStoreCatalogFacadeOutputDto,
    FindStoreCatalogFacadeInputDto,
    FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export interface UseCasesProps {
    findUseCase: UseCaseInterface;
    findAllUsecase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _findAllUsecase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._findUsecase = usecasesProps.findUseCase;
        this._findAllUsecase = usecasesProps.findAllUsecase;
    }

    async find(
        id: FindStoreCatalogFacadeInputDto
    ): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUsecase.execute(id);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return  await this._findAllUsecase.execute({});
    }
}