import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

/**
 * @class ListCategoriesUseCase
 * @description Class that implements the service to list all categories
 * @author mac3designer
 */
class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };