import { ChangeEvent, forwardRef, ReactNode, Ref } from 'react';
import { MenuItem, TextField, TextFieldProps, useForkRef } from '@mui/material';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useFormError } from './FormErrorProvider';
import { useTransform } from './useTransform';
import { utilsService } from '@utils/utilsService';

export type SelectElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
> = Omit<TextFieldProps, 'name' | 'type' | 'onChange'> & {
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  name: TName;
  options?: TValue[];
  valueKey?: string;
  labelKey?: string;
  type?: 'string' | 'number';
  parseError?: (error: FieldError) => ReactNode;
  objectOnChange?: boolean;
  onChange?: (value: any) => void;
  control?: Control<TFieldValues>;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue;
    output?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => PathValue<TFieldValues, TName>;
  }
}

export const SelectElement = forwardRef(<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown
>(
    props: SelectElementProps<TFieldValues, TName, TValue>,
    ref: Ref<HTMLDivElement>
) => {
  const {
    name,
    valueKey = 'id',
    labelKey = 'label',
    options = [],
    parseError,
    type,
    objectOnChange,
    rules = {},
    control,
    inputRef,
    transform,
    ...rest
  } = props

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const isNativeSelect = !!rest.SelectProps?.native;

  const {field, fieldState: {error},} = useController({
    name,
    rules,
    disabled: rest.disabled,
    control
  })

  const {value, onChange} = useTransform<TFieldValues, TName, TValue>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
          typeof transform?.input === 'function'
              ? transform.input
              : (value) => {
                return value?.[valueKey] ?? value ?? ('' as TValue)
              },
      output:
          typeof transform?.output === 'function'
              ? transform.output
              : (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                let value: string | number = event.target.value
                if (type === 'number' && value) {
                  value = Number(value)
                }
                return value as PathValue<TFieldValues, TName>
              }
    }
  })

  const handleInputRef = useForkRef(field.ref, inputRef);

  if (type === 'number' && typeof value !== 'undefined') {
    rest.InputLabelProps = rest.InputLabelProps || {}
    rest.InputLabelProps.shrink = true
  }

  return (
      <TextField
          {...rest}
          name={name}
          value={value}
          onBlur={field.onBlur}
          ref={ref}
          onChange={(event) => {
            onChange(event)
            if (typeof rest.onChange === 'function') {
              let value: string | number | TValue | undefined = event.target.value
              if (type === 'number' && value) {
                value = Number(value)
              }
              if (objectOnChange) {
                value = options.find((i) => i[valueKey] === value)
              }
              rest.onChange(value)
            }
          }}
          select
          required={!!rules.required}
          error={!!error}
          helperText={
            error
                ? typeof customErrorFn === 'function'
                    ? customErrorFn(error)
                    : error.message
                : rest.helperText
          }
          inputRef={handleInputRef}>
        {isNativeSelect && <option/>}
        {
          options.map((item) => {
            const key = `${name}_${item[valueKey]}`
            const optionProps = {
              value: item?.[valueKey] ?? item,
              disabled: utilsService.propertyExists(item, 'disabled') ? !!item.disabled : false,
              children: item[labelKey],
            }
            return isNativeSelect ? (
                <option key={key} {...optionProps} />
            ) : (
                <MenuItem key={key} {...optionProps} />
            )
          })
        }
      </TextField>
  )
})
