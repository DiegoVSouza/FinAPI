import { Statement } from "../../entities/Statement";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export type ICreateStatementDTO = {
  user_id?: string
  recipient_id?: string,
  sender_id?: string,
  type: OperationType,
  amount: number,
  description: string
}

