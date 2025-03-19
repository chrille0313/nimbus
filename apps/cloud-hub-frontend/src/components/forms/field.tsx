import { Select, SelectContent, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Control, FieldValues, Path, ControllerRenderProps } from 'react-hook-form';

interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  labelSlot?: React.ReactNode;
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}

function BaseField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  labelSlot,
  children
}: BaseFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel>{`${label ?? name}${required ? ' *' : ''}`}</FormLabel>
            {labelSlot}
          </div>
          {children(field)}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-destructive-foreground" />
        </FormItem>
      )}
    />
  );
}

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
