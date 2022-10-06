import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository)
    });
    it("should be able to show a existing user", async () => {
        const new_user = await createUserUseCase.execute({
            name: "teste",
            email: "emailteste@teste.com",
            password: "123",
        });
        const user_id = String(new_user.id)
        const user = await showUserProfileUseCase.execute(user_id)
        expect(user.id).toEqual(user_id);
    });

    it("shouldn`t be able to show a not existing user", async () => {

        await expect(showUserProfileUseCase.execute('')).rejects.toEqual(new ShowUserProfileError())

    });

});