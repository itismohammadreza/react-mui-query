import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  ToggleButtonProps,
} from '@mui/material';
import { MouseEvent, ReactNode } from 'react';
import { useFormError } from './FormErrorProvider';
import { useTransform } from './useTransform';

type SingleToggleButtonProps = Omit<ToggleButtonProps, 'value' | 'children'> & {
  id: number | string
  label: ReactNode
}

export type ToggleButtonGroupElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
> = ToggleButtonGroupProps & {
  label?: string;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  name: TName;
  parseError?: (error: FieldError) => ReactNode;
  control?: Control<TFieldValues>;
  options: SingleToggleButtonProps[];
  formLabelProps?: FormLabelProps;
  helperText?: string;
  enforceAtLeastOneSelected?: boolean;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue
    output?: (...event: any[]) => PathValue<TFieldValues, TName>
  }
}

export const ToggleButtonGroupElement = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
>(
    props: ToggleButtonGroupElementProps<TFieldValues, TName, TValue>
) => {
  const {
    name,
    control,
    label,
    rules = {},
    options = [],
    parseError,
    helperText,
    formLabelProps,
    enforceAtLeastOneSelected = false,
    exclusive,
    transform,
    ...toggleButtonGroupProps
  } = props;
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const {field, fieldState: {error}} = useController({
    name,
    control,
    rules,
    disabled: toggleButtonGroupProps.disabled
  })

  const {value, onChange} = useTransform<TFieldValues, TName, TValue>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input: transform?.input,
      output:
          typeof transform?.output === 'function'
              ? transform.output
              : (_event: MouseEvent<HTMLElement, MouseEvent>, value: any) => {
                return value
              }
    }
  })

  const renderHelperText = error
      ? typeof customErrorFn === 'function'
          ? customErrorFn(error)
          : error.message
      : helperText

  return (
      <FormControl
          error={!!error}
          required={!!rules.required}
          fullWidth={toggleButtonGroupProps?.fullWidth}>
        {
            label && (
                <FormLabel
                    {...formLabelProps}
                    error={!!error}
                    required={!!rules.required}
                    sx={{mb: 1, ...formLabelProps?.sx}}>
                  {label}
                </FormLabel>
            )
        }
        <ToggleButtonGroup
            {...toggleButtonGroupProps}
            exclusive={exclusive}
            value={value}
            onBlur={field.onBlur}
            onChange={(event, value) => {
              if (enforceAtLeastOneSelected) {
                if (exclusive && value === null) return
                if (!exclusive && value?.length === 0) return
              }
              onChange(event, value)
              if (typeof toggleButtonGroupProps.onChange === 'function') {
                toggleButtonGroupProps.onChange(event, value)
              }
            }}>
          {
            options.map(({label, id, ...toggleProps}) => (
                <ToggleButton value={id} {...toggleProps} key={id}>
                  {label}
                </ToggleButton>
            ))
          }
        </ToggleButtonGroup>
        {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
      </FormControl>
  )
}
