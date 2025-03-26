import { FieldValues } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base';
import { FormControl } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';

export interface InputFieldProps<T extends FieldValues>
  extends Omit<BaseFieldProps<T>, 'children'> {
  type?: string;
  placeholder?: string;
}

export function InputField<T extends FieldValues>({
  type = 'text',
  placeholder,
  ...props
}: InputFieldProps<T>) {
  return (
    <BaseField {...props}>
      {(field) => (
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
      )}
    </BaseField>
  );
}
