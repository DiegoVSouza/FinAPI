import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
}

let usersRepository: InMemoryUsersRepository;
let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository()
        getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepository, statementsRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository)
        createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository)
    });
    it("should be able to get a statement", async () => {
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

        const getStatement = await getStatementOperationUseCase.execute({
            user_id: user.id as string,
            statement_id: statement.id as string
        })

        expect(getStatement.user_id).toEqual(user.id as string);
        expect(getStatement).toHaveProperty('id');
    });
    it("shouldn`t be able to get a statement with a invalid user id", async () => {

        await expect(getStatementOperationUseCase.execute({
            user_id: '',
            statement_id: ''
        })).rejects.toEqual(new GetStatementOperationError.UserNotFound())

    });

    it("shouldn`t be able to get a statement with invalid statement", async () => {
        const user = await createUserUseCase.execute({
            name: "teste",
            email: "emailteste@teste.com",
            password: "123",
        });

        await expect(getStatementOperationUseCase.execute({
            user_id: user.id as string,
            statement_id: ''
        })).rejects.toEqual(new GetStatementOperationError.StatementNotFound())

    });
});
