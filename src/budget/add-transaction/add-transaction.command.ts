import { ICommand } from '@nestjs/cqrs';

export class AddTransaction implements ICommand {
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
    public readonly date: Date,
    public readonly payee: string,
  ) {}
}
