import { Injectable } from '@nestjs/common';
import { ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { nanoid } from 'nanoid';
import { BudgetAggregate } from '../domain/budget.aggregate';

@Injectable()
export abstract class BudgetCommandHandler<T, V = any>
  implements ICommandHandler<T, V>
{
  constructor(public readonly publisher: EventPublisher) {}

  getBudget(id: string = nanoid()): BudgetAggregate {
    return this.publisher.mergeObjectContext(new BudgetAggregate(id));
  }

  abstract execute(command: T): Promise<V>;
}
