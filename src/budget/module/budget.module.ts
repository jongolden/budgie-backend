import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import {
  BudgetProjection,
  BudgetProjectionSchema,
} from '../projections/budget/budget.projection';
import { AddAccountHandler } from '../add-account';
import { CreateBudgetHandler } from '../create-budget/create-budget.command';
import { CqrsModule } from '@nestjs/cqrs';
import { BudgetProjectionHandler } from '../projections/budget/budget-projection.handler';
import { AccountProjectionHandler } from '../projections/account/account-projection.handler';
import {
  AccountProjection,
  AccountProjectionSchema,
} from '../projections/account/account.project';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: BudgetProjection.name, schema: BudgetProjectionSchema },
      { name: AccountProjection.name, schema: AccountProjectionSchema },
    ]),
  ],
  providers: [
    BudgetService,
    AddAccountHandler,
    CreateBudgetHandler,
    BudgetProjectionHandler,
    AccountProjectionHandler,
  ],
  controllers: [BudgetController],
})
export class BudgetModule {}
