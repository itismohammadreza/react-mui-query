import { TextField, TextFieldProps, useForkRef } from '@mui/material';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps
} from 'react-hook-form';
import { useFormError } from './FormErrorProvider';
import { ChangeEvent, forwardRef, ReactNode, Ref } from 'react';
import { useTransform } from './useTransform';

export type TextFieldElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
> = Omit<TextFieldProps, 'name'> & {
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  name: TName;
  parseError?: (error: FieldError) => ReactNode;
  control?: Control<TFieldValues>;
  component?: typeof TextField;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue;
    output?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => PathValue<TFieldValues, TName>;
  }
}

export const TextFieldElement = forwardRef(<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown
>(
    props: TextFieldElementProps<TFieldValues, TName, TValue>,
    ref: Ref<HTMLDivElement>
) => {
  const {
    rules = {},
    parseError,
    type,
    name,
    control,
    component: TextFieldComponent = TextField,
    inputRef,
    transform,
    ...rest
  } = props

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const {field, fieldState: {error}} = useController({
    name,
    control,
    disabled: rest.disabled,
    rules
  })

  const {value, onChange} = useTransform<TFieldValues, TName, TValue>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
          typeof transform?.input === 'function'
              ? transform.input
              : (value) => value || ('' as TValue),
      output:
          typeof transform?.output === 'function'
              ? transform.output
              : (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const value = event.target.value
                return (type === 'number' && value ? +value : value) as PathValue<TFieldValues, TName>
              }
    }
  })

  const handleInputRef = useForkRef(field.ref, inputRef);

  return (
      <TextFieldComponent
          {...rest}
          name={field.name}
          value={value}
          onChange={(event) => {
            onChange(event)
            if (typeof rest.onChange === 'function') {
              rest.onChange(event)
            }
          }}
          onBlur={field.onBlur}
          required={!!rules.required}
          type={type}
          error={!!error}
          helperText={
            error
                ? typeof customErrorFn === 'function'
                    ? customErrorFn(error)
                    : error.message
                : rest.helperText
          }
          ref={ref}
          inputRef={handleInputRef}
      />
  )
})
