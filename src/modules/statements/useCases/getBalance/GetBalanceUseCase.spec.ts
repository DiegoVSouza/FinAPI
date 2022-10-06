import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
}

let usersRepository: InMemoryUsersRepository;
let statementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository()
        getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository)
    });
    it("should be able to get a user balance", async () => {
        const user = await createUserUseCase.execute({
            name: "teste",
            email: "emailteste@teste.com",
            password: "123",
        });

        const type = "deposit" as OperationType

        const balance = await getBalanceUseCase.execute({
            user_id: user.id as string
        })

        expect(balance).toHaveProperty("statement");
    });
    it("shouldn`t be able to get balance with invalid id", async () => {

        await expect(getBalanceUseCase.execute({
            user_id: '',
        })).rejects.toEqual(new GetBalanceError())
    });

});
