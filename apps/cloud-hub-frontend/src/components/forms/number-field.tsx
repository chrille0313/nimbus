import { FieldValues } from 'react-hook-form';
import { InputField, InputFieldProps } from './field';

type FieldType = FieldValues;

export type NumberFieldProps<T extends FieldType> = Omit<
  InputFieldProps<T>,
  'type' | 'placeholder'
>;

export function NumberField<T extends FieldType>(props: NumberFieldProps<T>) {
  return <InputField type="number" {...props} />;
}
