import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

type FieldType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'rating' | 'scale';

interface IFormField {
  type: FieldType;
  label: string;
  required: boolean;
  anonymous: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface IForm extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  fields: IFormField[];
  createdAt: Date;
  updatedAt: Date;
}

const FormFieldSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['text', 'textarea', 'radio', 'checkbox', 'select', 'rating', 'scale'],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  options: {
    type: [String],
    default: undefined
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  step: {
    type: Number,
    default: undefined
  }
}, { _id: false });

const FormSchema: Schema<IForm> = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  fields: [FormFieldSchema]
}, {
  timestamps: true
});

const FormModel = mongoose.model<IForm>('Form', FormSchema);

export default FormModel;

