import { IEvent } from '@nestjs/cqrs';
import { Transaction } from '../module/types';

export class TransactionAdded implements IEvent {
  constructor(
    public readonly id: string,
    public readonly transaction: Transaction,
    public readonly addedAt: Date,
  ) {}
}
