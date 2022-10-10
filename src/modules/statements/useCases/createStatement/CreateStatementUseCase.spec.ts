import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementController } from "./CreateStatementController";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
}

let usersRepository: InMemoryUsersRepository;
let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;
let createUserController: CreateStatementController;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository()
        createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository);
        createUserController = new CreateStatementController()
        createUserUseCase = new CreateUserUseCase(usersRepository)
    });
    it("should be able to create a statement", async () => {
        const user = await createUserUseCase.execute({
            name: "teste",
            email: "emailteste@teste.com",
            password: "123",
        });

        const type = "deposit" as OperationType

        const statement = await createStatementUseCase.execute({
            user_id: user.id as string,
            type: type,
            amount: 100,
            description: "deposit test"
        })

        expect(statement).toHaveProperty("id");
    });
    it("shouldn`t be able to create a statement with a invalid id", async () => {
        const type = "deposit" as OperationType

        await expect(createStatementUseCase.execute({
            user_id: '',
            type: type,
            amount: 100,
            description: "deposit test"
        })).rejects.toEqual(new CreateStatementError.UserNotFound())

    });

    it("shouldn`t be able to create a statement of type withdraw with insufficient funds", async () => {
        const user = await createUserUseCase.execute({
            name: "teste",
            email: "emailteste@teste.com",
            password: "123",
        });

        const type = "withdraw" as OperationType

        await expect(createStatementUseCase.execute({
            user_id: user.id as string,
            type: type,
            amount: 100,
            description: "deposit test"
        })).rejects.toEqual(new CreateStatementError.InsufficientFunds())

    });
});
