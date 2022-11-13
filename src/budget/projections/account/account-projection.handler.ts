import { EventsHandler, IEventHandler, IEvent } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { AccountAdded } from 'src/budget/add-account';
import { AccountRemoved } from 'src/budget/remove-account/account-removed.event';
import { AccountProjection, AccountProjectionModel } from './account.project';

@EventsHandler(AccountAdded, AccountRemoved)
export class AccountProjectionHandler
  implements IEventHandler<AccountAdded>, IEventHandler<AccountRemoved>
{
  constructor(
    @InjectModel(AccountProjection.name)
    private readonly model: AccountProjectionModel,
  ) {}

  async handle(event: IEvent): Promise<void> {
    switch (event.constructor.name) {
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

  private async onAccountAdded(event: AccountAdded) {
    const { account, addedAt } = event;

    await this.model.updateOne(
      { _id: account.id },
      {
        $set: {
          name: account.name,
          type: account.type,
          balance: account.balance,
          addedAt,
        },
        $setOnInsert: {
          transactions: [],
        },
      },
      { upsert: true },
    );
  }

  private async onAccountRemoved(event: AccountRemoved) {
    const { accountId, removedAt } = event;

    await this.model.updateOne(
      { _id: accountId },
      {
        $set: {
          removedAt,
        },
      },
    );
  }
}
