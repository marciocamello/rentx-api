import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create(data: ICreateUserDTO): Promise<void> {

        const {
            name,
            password,
            email,
            driver_license,
            id,
            avatar
        } = this.repository.create(data);

        await this.repository.save({
            name,
            password,
            email,
            driver_license,
            id,
            avatar
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({
            email
        });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({
            id
        });

        return user;
    }
}

export { UsersRepository };