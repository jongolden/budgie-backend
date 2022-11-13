import { ICommand } from '@nestjs/cqrs';

export class ClearTransaction implements ICommand {
  constructor(public readonly transactionId: string) {}
}
