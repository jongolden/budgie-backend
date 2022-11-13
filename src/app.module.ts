import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/module/budget.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
