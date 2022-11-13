import { ValueObject } from '../../module/types';

export class AccountType implements ValueObject<string> {
  private constructor(public readonly value: string) {}

  static create(value: string) {
    return new AccountType(value);
  }
}
