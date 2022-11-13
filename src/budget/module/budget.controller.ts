import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AddAccount } from '../add-account';
import { CreateBudget } from '../create-budget/create-budget.command';
import { BudgetService } from './budget.service';

@Controller('budget')
export class BudgetController {
  constructor(private readonly service: BudgetService) {}

  @Post()
  async createBudget(@Body() body: CreateBudget) {
    try {
      const budgetId = await this.service.createBudget(body.name);

      return { id: budgetId };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/add-account')
  async addAccount(
    @Param('id') id: string,
    @Body() body: AddAccount['account'],
  ) {
    try {
      const accountId = await this.service.addAccount(id, body);

      return { id: accountId };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
