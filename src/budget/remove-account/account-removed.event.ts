import { IEvent } from '@nestjs/cqrs';

export class AccountRemoved implements IEvent {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly removedAt: Date,
  ) {}
}
