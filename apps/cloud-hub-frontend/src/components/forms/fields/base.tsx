import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form';
import { Control, FieldValues, Path, ControllerRenderProps } from 'react-hook-form';

export interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  labelSlot?: React.ReactNode;
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}

export function BaseField<T extends FieldValues>({
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
