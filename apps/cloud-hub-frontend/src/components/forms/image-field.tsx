import { FieldValues, Path } from 'react-hook-form';
import { InputField, InputFieldProps } from '@/components/forms/field';

type FieldType = FieldValues;

export type ImageFieldProps<T extends FieldType> = Omit<
  InputFieldProps<T>,
  'name' | 'type' | 'placeholder'
> &
  Pick<Partial<InputFieldProps<T>>, 'name'>;

export function ImageField<T extends FieldType>(props: ImageFieldProps<T>) {
  return <InputField name={'image' as Path<T>} label="Image" type="file" {...props} />;
}
