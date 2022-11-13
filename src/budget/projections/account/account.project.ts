import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class AccountProjection {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  balance: number;

  @Prop()
  addedAt: Date;

  @Prop()
  removedAt: Date;
}

export type AccountProjectionDocument = HydratedDocument<AccountProjection>;
export type AccountProjectionModel = Model<AccountProjectionDocument>;
export const AccountProjectionSchema =
  SchemaFactory.createForClass(AccountProjection);
