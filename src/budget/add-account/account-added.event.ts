import { IEvent } from '@nestjs/cqrs';
import { Account } from '../module/types';

export class AccountAdded implements IEvent {
  constructor(
    public readonly id: string,
    public readonly account: Account,
    public readonly addedAt: Date,
  ) {}
}
