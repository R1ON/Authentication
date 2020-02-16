import {
  Schema,
  model,
  Types,
  // eslint-disable-next-line no-unused-vars
  Document,
} from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  links: any[];
}

const schema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

export default model<IUser>('User', schema);
