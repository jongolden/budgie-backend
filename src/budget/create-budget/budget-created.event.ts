import { IEvent } from '@nestjs/cqrs';

export class BudgetCreated implements IEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
  ) {}
}
