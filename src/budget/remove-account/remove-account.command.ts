import { ICommand } from '@nestjs/cqrs';
import { BudgetCommandHandler } from '../module/budget-command.handler';

export class RemoveAccount implements ICommand {
  constructor(
    public readonly budgetId: string,
    public readonly accountId: string,
  ) {}
}

export class RemoveAccountHandler extends BudgetCommandHandler<RemoveAccount> {
  async execute(command: RemoveAccount): Promise<any> {
    const { budgetId, accountId } = command;

    const budget = this.getBudget(budgetId);

    budget.removeAccount(accountId);

    budget.commit();
  }
}
