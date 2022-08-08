import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

/**
 * @class ImportCategoryUseCase
 * @description Class that implements the service to import a category from CSV file
 * @author mac3designer
 */
class ImportCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on('data', async (line: string[]) => {
                const [name, description] = line;

                categories.push({
                    name,
                    description
                });
            })
                .on('end', () => {
                    resolve(categories);
                })
                .on('error', (err: Error) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(category => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                });
            }
        });
    }
}

export { ImportCategoryUseCase };