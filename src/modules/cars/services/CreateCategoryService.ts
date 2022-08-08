import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

/**
 * @class CreateCategoryService
 * @description Class that implements the service to create a category
 * @author mac3designer
 */
class CreateCategoryService {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };