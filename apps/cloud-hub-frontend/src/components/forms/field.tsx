import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  labelSlot?: React.ReactNode;
}

export function InputField<T extends FieldValues>(props: InputFieldProps<T>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel>{`${props.label ?? props.name}${props.required ? ' *' : ''}`}</FormLabel>
            {props.labelSlot}
          </div>
          <FormControl>
            <Input type={props.type ?? 'text'} placeholder={props.placeholder} {...field} />
          </FormControl>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage className="text-destructive-foreground" />
        </FormItem>
      )}
    />
  );
}
