import { ValueObject } from '../../module/types';

export class AccountName implements ValueObject<string> {
  private constructor(public readonly value: string) {}

  static create(value: string) {
    return new AccountName(value);
  }
}
