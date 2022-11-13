import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
class BudgetAccount {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  addedAt: Date;
}

@Schema()
export class BudgetProjection {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  accounts: BudgetAccount[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type BudgetProjectionDocument = HydratedDocument<BudgetProjection>;
export type BudgetProjectionModel = Model<BudgetProjectionDocument>;
export const BudgetProjectionSchema =
  SchemaFactory.createForClass(BudgetProjection);
