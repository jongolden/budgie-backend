import { CommandHandler, ICommand } from '@nestjs/cqrs';
import { nanoid } from 'nanoid';
import { BudgetCommandHandler } from '../module/budget-command.handler';
import { AccountName, AccountType } from '../domain/value-objects';
import { Account } from '../module/types';

export class AddAccount implements ICommand {
  constructor(
    public readonly budgetId: string,
    public readonly account: Omit<Account, 'id'>,
  ) {}
}

@CommandHandler(AddAccount)
export class AddAccountHandler extends BudgetCommandHandler<AddAccount> {
  async execute(command: AddAccount): Promise<any> {
    const {
      budgetId,
      account: { name, type, balance },
    } = command;

    const budget = this.getBudget(budgetId);

    const accountId = nanoid();

    budget.addAccount(
      accountId,
      AccountName.create(name),
      AccountType.create(type),
      balance,
    );

    budget.commit();

    return accountId;
  }
}
