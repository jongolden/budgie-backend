import { EventsHandler, IEventHandler, IEvent } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { AccountAdded } from 'src/budget/add-account';
import { BudgetCreated } from 'src/budget/create-budget/budget-created.event';
import { AccountRemoved } from 'src/budget/remove-account/account-removed.event';
import { BudgetProjection, BudgetProjectionModel } from './budget.projection';

@EventsHandler(BudgetCreated, AccountAdded, AccountRemoved)
export class BudgetProjectionHandler
  implements
    IEventHandler<BudgetCreated>,
    IEventHandler<AccountAdded>,
    IEventHandler<AccountRemoved>
{
  constructor(
    @InjectModel(BudgetProjection.name)
    private readonly model: BudgetProjectionModel,
  ) {}

  async handle(event: IEvent): Promise<void> {
    switch (event.constructor.name) {
      case BudgetCreated.name: {
        await this.onBudgetCreated(event as BudgetCreated);
        break;
      }
      case AccountAdded.name: {
        await this.onAccountAdded(event as AccountAdded);
        break;
      }
      case AccountRemoved.name: {
        await this.onAccountRemoved(event as AccountRemoved);
        break;
      }
    }
  }

  private async onBudgetCreated(event: BudgetCreated) {
    const { id, name, createdAt } = event;

    await this.model.create({ _id: id, name, createdAt });
  }

  private async onAccountAdded(event: AccountAdded) {
    const { id, account, addedAt } = event;

    await this.model.updateOne(
      { _id: id },
      {
        $addToSet: {
          accounts: {
            _id: account.id,
            name: account.name,
            addedAt,
          },
        },
      },
      { upsert: true },
    );
  }

  private async onAccountRemoved(event: AccountRemoved) {
    const { id, accountId } = event;

    await this.model.updateOne(
      { _id: id },
      {
        $pull: {
          accounts: {
            _id: accountId,
          },
        },
      },
    );
  }
}
