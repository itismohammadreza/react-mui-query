import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material'
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
import { forwardRef, ReactNode, Ref } from 'react';
import { useTransform } from './useTransform';
import { utilsService } from '@utils/utilsService';

export type CheckboxButtonGroupProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TValue = unknown> = {
  options: (TValue | unknown)[];
  helperText?: ReactNode;
  name: TName;
  parseError?: (error: FieldError) => ReactNode;
  label?: string;
  labelKey?: string;
  valueKey?: string;
  onChange?: (data: TValue[]) => void;
  returnObject?: boolean;
  disabled?: boolean;
  row?: boolean;
  control?: Control<TFieldValues>;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  checkboxColor?: CheckboxProps['color'];
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control'>;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue[];
    output?: (value: TValue[]) => PathValue<TFieldValues, TName>;
  }
  defaultValue?: TValue[];
}

export const CheckboxButtonGroup = forwardRef(<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown
>(
    props: CheckboxButtonGroupProps<TFieldValues, TName, TValue>,
    ref: Ref<HTMLDivElement>
) => {
  const {
    helperText,
    options,
    label,
    name,
    parseError,
    labelKey = 'label',
    valueKey = 'id',
    returnObject,
    disabled,
    row,
    control,
    checkboxColor,
    rules,
    labelProps,
    transform,
    defaultValue = [],
    ...rest
  } = props

  const theme = useTheme();
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const {field, fieldState: {error, invalid},} = useController({
    name,
    rules: rules,
    disabled,
    control,
    defaultValue: defaultValue as PathValue<TFieldValues, TName>,
  })

  const {value: selectedOptions, onChange} = useTransform<TFieldValues, TName, TValue[]>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
          typeof transform?.input === 'function'
              ? transform.input
              : (value) => {
                return Array.isArray(value) ? value : ([] as TValue[])
              },
      output: transform?.output,
    },
  })

  const handleChange = (option: unknown) => {
    const optionValue = utilsService.propertyExists(option, valueKey)
        ? option[valueKey]
        : option
    const existsAtIndex = selectedOptions.findIndex((selectedOption) => {
      const selectedOptionValue = utilsService.propertyExists(selectedOption, valueKey)
          ? selectedOption[valueKey]
          : selectedOption
      return optionValue === selectedOptionValue
    })

    const newValues = (
        existsAtIndex === -1
            ? [...selectedOptions, option]
            : selectedOptions.filter((_, index) => existsAtIndex !== index)
    ).map((selectedOption) =>
        returnObject || !utilsService.propertyExists(selectedOption, valueKey)
            ? selectedOption
            : selectedOption[valueKey]
    ) as TValue[]
    onChange(newValues)
    if (typeof rest.onChange === 'function') {
      rest.onChange(newValues)
    }
  }

  const renderHelperText = error
      ? typeof customErrorFn === 'function'
          ? customErrorFn(error)
          : error.message
      : helperText

  return (
      <FormControl error={invalid} required={!!rules.required} ref={ref}>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <FormGroup row={row}>
          {
            options.map((option) => {
              const optionValue = utilsService.propertyExists(option, valueKey)
                  ? option[valueKey]
                  : option
              const optionLabel = utilsService.propertyExists(option, labelKey)
                  ? option[labelKey]
                  : option

              const isChecked = selectedOptions.some((selectedOption) => {
                const selectedOptionValue = utilsService.propertyExists(selectedOption, valueKey)
                    ? selectedOption[valueKey]
                    : selectedOption
                return selectedOptionValue === optionValue
              })

              return (
                  <FormControlLabel
                      {...labelProps}
                      control={
                        <Checkbox
                            sx={{color: error ? theme.palette.error.main : undefined}}
                            color={checkboxColor}
                            value={optionValue}
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => handleChange(option)}/>
                      }
                      label={`${optionLabel}`}
                      key={`${optionValue}`}/>
              )
            })
          }
        </FormGroup>
        {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
      </FormControl>
  )
})
