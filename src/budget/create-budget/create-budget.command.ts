import { CommandHandler, ICommand } from '@nestjs/cqrs';
import { BudgetCommandHandler } from '../module/budget-command.handler';

export class CreateBudget implements ICommand {
  constructor(public readonly name: string) {}
}

@CommandHandler(CreateBudget)
export class CreateBudgetHandler extends BudgetCommandHandler<CreateBudget> {
  async execute(command: CreateBudget): Promise<string> {
    const { name } = command;

    const budget = this.getBudget();

    budget.createBudget(name);

    budget.commit();

    return budget.id;
  }
}
