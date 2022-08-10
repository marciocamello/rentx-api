import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

/**
 * @class ListCategoriesUseCase
 * @description Class that implements the service to list all categories
 * @author mac3designer
 */
@injectable()
class ListCategoriesUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };