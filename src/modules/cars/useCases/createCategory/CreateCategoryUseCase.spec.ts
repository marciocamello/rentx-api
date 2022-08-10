import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it('should be able to create a new category', async () => {

        await createCategoryUseCase.execute({
            name: 'New Category',
            description: 'New Category Description'
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName('New Category');

        expect(categoryCreated).toBeDefined();
        expect(categoryCreated).toHaveProperty("id");
        expect(categoryCreated?.name).toBe('New Category');
        expect(categoryCreated?.description).toBe('New Category Description');
    });

    it('should not be able to create a new category with name exists', async () => {

        expect(async () => {
            await createCategoryUseCase.execute({
                name: 'New Category',
                description: 'New Category Description'
            });

            await createCategoryUseCase.execute({
                name: 'New Category',
                description: 'New Category Description'
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});