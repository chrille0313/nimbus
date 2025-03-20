import { FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from './input-field';

type FieldType = FieldValues & { email: string };

export type EmailFieldProps<T extends FieldType> = Omit<InputFieldProps<T>, 'name' | 'type'>;

export function EmailField<T extends FieldType>(props: EmailFieldProps<T>) {
  return (
    <InputField
      name={'email' as Path<T>}
      type="email"
      label="Email"
      placeholder="m@example.com"
      {...props}
    />
  );
}
