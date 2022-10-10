import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;
    const { amount, description } = request.body;
    const { user_id } = request.params;

    const splittedPath = request.originalUrl.split('/')
    let type = '' as OperationType

    if (user_id) {
      type = 'transfer' as OperationType
    } else {
      type = splittedPath[splittedPath.length - 1] as OperationType;
    }

    const createStatement = container.resolve(CreateStatementUseCase);

    const statementTransfer = {
      recipient_id: user_id,
      sender_id: id,
      type,
      amount: amount as number,
      description: description as string
    }

    const statementDepositWithdraw = {
      user_id: id,
      type,
      amount: amount as number,
      description: description as string
    }

    const statement = await createStatement.execute(user_id ? statementTransfer : statementDepositWithdraw);

    return response.status(201).json(statement);
  }
}
