import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

@injectable()
export class CreateStatementUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) { }

  async execute({ user_id, type, amount, description, recipient_id, sender_id }: ICreateStatementDTO) {
    var userId = user_id as string
    if (user_id) userId = user_id
    if (sender_id) userId = sender_id
    const user = await this.usersRepository.findById(userId);
    const recipientUser = await this.usersRepository.findById(recipient_id as string);



    if (!user) {
      throw new CreateStatementError.UserNotFound();
    }
    if (!recipientUser) {
      throw new CreateStatementError.UserNotFound();
    }

    if (type === 'withdraw' || type === 'transfer') {
      const { balance } = await this.statementsRepository.getUserBalance({ user_id: userId });
      console.log(balance)
      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds()
      }
    }

    if (type === 'transfer') {
      var DEPOSIT = 'deposit' as OperationType
      const test = await this.statementsRepository.create({
        user_id: recipient_id,
        type: DEPOSIT,
        amount,
        description
      })

      const statementOperation = await this.statementsRepository.create({
        sender_id,
        type,
        amount,
        description
      });

      return statementOperation;
    }

    const statementOperation = await this.statementsRepository.create({
      user_id,
      type,
      amount,
      description
    });

    return statementOperation;
  }
}
