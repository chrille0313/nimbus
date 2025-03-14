import { FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from './field';

type FieldType = FieldValues & { password: string };

export type PasswordFieldProps<T extends FieldType> = Omit<InputFieldProps<T>, 'name' | 'type'>;

export function PasswordField<T extends FieldType>(props: PasswordFieldProps<T>) {
  return <InputField name={'password' as Path<T>} type="password" label="Password" {...props} />;
}
