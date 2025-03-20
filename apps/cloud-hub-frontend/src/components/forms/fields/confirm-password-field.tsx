import { FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from './input-field';

type FieldType = FieldValues & { confirmPassword: string };

export type ConfirmPasswordFieldProps<T extends FieldType> = Omit<
  InputFieldProps<T>,
  'name' | 'type'
>;

export function ConfirmPasswordField<T extends FieldType>(props: ConfirmPasswordFieldProps<T>) {
  return (
    <InputField
      name={'confirmPassword' as Path<T>}
      type="password"
      label="Confirm Password"
      {...props}
    />
  );
}
