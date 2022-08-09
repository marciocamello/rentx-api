import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

/**
 * @class ListCategoriesUseCase
 * @description Class that implements the service to list all categories
 * @author mac3designer
 */
class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };