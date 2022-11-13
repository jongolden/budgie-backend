import { AggregateRoot } from '@nestjs/cqrs';
import { AccountAdded } from '../add-account/account-added.event';
import { TransactionAdded } from '../add-transaction/transaction-added.event';
import { TransactionCleared } from '../clear-transaction/transaction-cleared.event';
import { BudgetCreated } from '../create-budget/budget-created.event';
import { AccountRemoved } from '../remove-account/account-removed.event';
import { Account, Transaction } from '../module/types';
import { AccountName, AccountType } from './value-objects';

export class BudgetAggregate extends AggregateRoot {
  private readonly _id: string;
  private accounts: Map<string, Account>;
  private transactions: Map<string, Transaction>;

  constructor(id: string) {
    super();

    this._id = id;
    this.accounts = new Map();
  }

  get id() {
    return this._id;
  }

  createBudget(name: string) {
    this.apply(new BudgetCreated(this.id, name, new Date()));
  }

  addAccount(
    id: string,
    name: AccountName,
    type: AccountType,
    balance: number,
  ) {
    if (this.accounts.has(id)) {
      throw new Error(
        `account, ${name.value}, is already connected to this budget`,
      );
    }

    this.apply(
      new AccountAdded(
        this.id,
        { id, name: name.value, type: type.value, balance },
        new Date(),
      ),
    );
  }

  removeAccount(id: string) {
    if (this.accounts.has(id)) {
      this.apply(new AccountRemoved(this.id, id, new Date()));
    }
  }

  addTransaction(accountId: string, payee: string, amount: number, date: Date) {
    const account = this.accounts.get(accountId);

    if (!account) {
      throw new Error(`Could not find account with ID ${accountId}`);
    }

    this.apply(
      new TransactionAdded(
        this.id,
        {
          accountId,
          payee,
          amount,
          date,
          hasCleared: false,
        },
        new Date(),
      ),
    );
  }

  /**
   * Mark a transaction as cleared so that the transaction amount
   * can be applied to the account
   * @param id ID of the transaction
   */
  clearTransaction(id: string) {
    const transaction = this.transactions.get(id);

    if (!transaction) {
      throw new Error(`Could not find transaction with ID ${id}`);
    }

    this.apply(new TransactionCleared(this.id, id, new Date()));
  }
}
