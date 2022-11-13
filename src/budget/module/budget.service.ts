import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddAccount } from '../add-account';
import { CreateBudget } from '../create-budget/create-budget.command';
import { Account } from './types';

@Injectable()
export class BudgetService {
  constructor(private readonly commandBus: CommandBus) {}

  createBudget(name: string): Promise<string> {
    return this.commandBus.execute<CreateBudget, string>(
      new CreateBudget(name),
    );
  }

  addAccount(budgetId: string, account: Omit<Account, 'id'>): Promise<string> {
    return this.commandBus.execute<AddAccount, string>(
      new AddAccount(budgetId, account),
    );
  }
}
