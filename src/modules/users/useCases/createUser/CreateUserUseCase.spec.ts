import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });
  it("should be able to create a user", async () => {
    const user = await createUserUseCase.execute({
      name: "teste",
      email: "emailteste@teste.com",
      password: "123",
    });
    expect(user).toHaveProperty("id");
  });
  it("shouldn`t be able to create a user with a taken email", async () => {
    await createUserUseCase.execute({
      name: "teste",
      email: "emailteste@teste.com",
      password: "123",
    });
    await expect(createUserUseCase.execute({
      name: "teste",
      email: "emailteste@teste.com",
      password: "123",
    })).rejects.toEqual(new CreateUserError())
  });

  it("password should be encrypt", async () => {
    const user = await createUserUseCase.execute({
      name: "teste",
      email: "emailteste@teste.com",
      password: "123",
    });

    const passwordMatch = await compare('123', user.password);

    expect(passwordMatch).toBe(true)
  });
});

