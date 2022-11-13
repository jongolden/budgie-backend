import { IEvent } from '@nestjs/cqrs';

export class TransactionCleared implements IEvent {
  constructor(
    public readonly id: string,
    public readonly transactionId: string,
    public readonly clearedAt: Date,
  ) {}
}
