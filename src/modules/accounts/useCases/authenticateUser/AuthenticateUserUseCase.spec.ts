import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able to authenticate a user", async () => {

        const user: ICreateUserDTO = {
            name: "John Doe",
            email: "user@teste.com",
            password: "123456",
            driver_license: "123456"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a user non exists", async () => {

        expect(async () => {

            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate a user with wrong password", async () => {

        expect(async () => {

            const user: ICreateUserDTO = {
                name: "User test error",
                email: "user@user.com",
                password: "123456",
                driver_license: "9999"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password"
            });

        }).rejects.toBeInstanceOf(AppError);
    });
});