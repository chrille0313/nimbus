import { FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from './field';

type FieldType = FieldValues & { name: string };

export type NameFieldProps<T extends FieldType> = Omit<InputFieldProps<T>, 'name' | 'type'>;

export function NameField<T extends FieldType>(props: NameFieldProps<T>) {
  return <InputField name={'name' as Path<T>} label="Name" placeholder="Full Name" {...props} />;
}
