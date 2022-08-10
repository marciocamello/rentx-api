import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {

    users: User[] = [];

    async create({
        name,
        driver_license,
        email,
        password
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            driver_license,
            email,
            password
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }
}

export { UserRepositoryInMemory };