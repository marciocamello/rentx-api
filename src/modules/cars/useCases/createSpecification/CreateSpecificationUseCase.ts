import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

/**
 * @class CreateSpecificationUseCase
 * @description Class that implements the service to create a specification
 * @author mac3designer
 */
@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError('Specification already exists');
        }

        await this.specificationsRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };