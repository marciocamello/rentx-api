import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

/**
 * @class CreateSpecificationUseCase
 * @description Class that implements the service to create a specification
 * @author mac3designer
 */
class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) { }

    execute({ name, description }: IRequest): void {

        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists');
        }

        this.specificationsRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };