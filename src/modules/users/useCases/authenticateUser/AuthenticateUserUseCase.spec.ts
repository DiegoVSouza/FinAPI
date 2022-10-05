import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let usersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });
  it("should be able to create a token", async () => {
    const user = await createUserUseCase.execute({
      name: "teste",
      email: "emailteste@teste.com",
      password: "123",
    });

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: '123',
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("shouldn`t be able to authenticate a not existing email", async () => {
    const user = await createUserUseCase.execute({
      name: "teste",
      email: "emailteste@teste.com",
      password: "123",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "outroemail@teste.com",
        password: "123",
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });
});
