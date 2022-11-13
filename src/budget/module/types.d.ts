export type Transaction = {
  accountId: Account.id;
  payee: string;
  amount: number;
  hasCleared: boolean;
  date: Date;
};

export type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  transactions?: Transaction[];
};

export interface ValueObject<T> {
  value: T;
}
