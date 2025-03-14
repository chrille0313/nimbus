import { FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from './field';

type FieldType = FieldValues & { username: string };

export type UsernameFieldProps<T extends FieldType> = Omit<InputFieldProps<T>, 'name' | 'type'>;

export function UsernameField<T extends FieldType>(props: UsernameFieldProps<T>) {
  return <InputField name={'username' as Path<T>} label="Username" {...props} />;
}
