import { FieldValues } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base';
import { FormControl } from '@repo/ui/components/form';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@repo/ui/components/select';

export interface SelectFieldProps<T extends FieldValues>
  extends Omit<BaseFieldProps<T>, 'children'> {
  placeholder?: string;
  children: React.ReactNode;
}

export function SelectField<T extends FieldValues>({
  children,
  placeholder,
  ...props
}: SelectFieldProps<T>) {
  return (
    <BaseField {...props}>
      {(field) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </BaseField>
  );
}
