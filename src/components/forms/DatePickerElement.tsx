import { DatePicker, DatePickerProps, DatePickerSlotProps, } from '@mui/x-date-pickers/DatePicker'
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import { TextFieldProps, useForkRef } from '@mui/material'
import { useFormError } from './FormErrorProvider'
import { forwardRef, ReactNode, Ref } from 'react'
import { DateValidationError, PickerChangeHandlerContext, } from '@mui/x-date-pickers'
import { defaultErrorMessages } from './messages/DatePicker'
import { useLocalizationContext, validateDate, } from '@mui/x-date-pickers/internals'
import { useTransform } from './useTransform'
import { utilsService } from '@utils/utilsService';
import { PickerValidDate } from '@mui/x-date-pickers/models'

export type DatePickerElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue extends PickerValidDate = PickerValidDate,
    TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<DatePickerProps<TValue>, 'value' | 'slotProps'> & {
  name: TName;
  isDate?: boolean;
  parseError?: (error: FieldError | DateValidationError) => ReactNode;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  control?: Control<TFieldValues>;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  textReadOnly?: boolean;
  slotProps?: Omit<DatePickerSlotProps<TValue, TEnableAccessibleFieldDOMStructure>, 'textField'>;
  overwriteErrorMessages?: typeof defaultErrorMessages;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue | null;
    output?: (value: TValue | null, context: PickerChangeHandlerContext<DateValidationError>) => PathValue<TFieldValues, TName>;
  }
}

export const DatePickerElement = forwardRef(<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue extends PickerValidDate = PickerValidDate
>(
    props: DatePickerElementProps<TFieldValues, TName, TValue>,
    ref: Ref<HTMLDivElement>
) => {
  const {
    parseError,
    name,
    rules = {},
    inputProps,
    control,
    textReadOnly,
    slotProps,
    overwriteErrorMessages,
    inputRef,
    transform,
    ...rest
  } = props;

  const adapter = useLocalizationContext();

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const errorMessages = {
    ...defaultErrorMessages,
    ...overwriteErrorMessages,
  }

  const rulesTmp = {
    ...rules,
    validate: {
      internal: (value: TValue | null) => {
        const internalError = validateDate({
          props: {
            shouldDisableDate: rest.shouldDisableDate,
            shouldDisableMonth: rest.shouldDisableMonth,
            shouldDisableYear: rest.shouldDisableYear,
            disablePast: Boolean(rest.disablePast),
            disableFuture: Boolean(rest.disableFuture),
            minDate: rest.minDate,
            maxDate: rest.maxDate,
            timezone: rest.timezone ?? utilsService.getTimezone(adapter, value) ?? 'default',
          },
          value,
          adapter,
        })
        return internalError == null || errorMessages[internalError]
      },
      ...rules.validate
    },
  }

  const {field, fieldState: {error},} = useController({
    name,
    control,
    rules: rulesTmp,
    disabled: rest.disabled,
    defaultValue: null as PathValue<TFieldValues, TName>
  })

  const {value, onChange} = useTransform<TFieldValues, TName, TValue | null>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
          typeof transform?.input === 'function'
              ? transform.input
              : (newValue) => {
                return newValue && typeof newValue === 'string'
                    ? (adapter.utils.date(newValue) as unknown as TValue)
                    : newValue
              },
      output:
          typeof transform?.output === 'function'
              ? transform.output
              : (newValue) => newValue
    }
  })

  const handleInputRef = useForkRef(field.ref, inputRef);

  const errorMessage = error
      ? typeof customErrorFn === 'function'
          ? customErrorFn(error)
          : error.message
      : null

  return (
      <DatePicker
          {...rest}
          {...field}
          value={value}
          ref={ref}
          inputRef={handleInputRef}
          onClose={(...args) => {
            field.onBlur()
            if (rest.onClose) {
              rest.onClose(...args)
            }
          }}
          onChange={(newValue, context) => {
            onChange(newValue, context)
            if (typeof rest.onChange === 'function') {
              rest.onChange(newValue, context)
            }
          }}
          slotProps={{
            ...slotProps,
            textField: {
              ...inputProps,
              required: !!rules.required,
              onBlur: (event) => {
                field.onBlur()
                if (typeof inputProps?.onBlur === 'function') {
                  inputProps.onBlur(event)
                }
              },
              error: !!errorMessage,
              helperText: errorMessage
                  ? errorMessage
                  : inputProps?.helperText || rest.helperText,
              inputProps: {
                readOnly: !!textReadOnly,
                ...inputProps?.inputProps,
              },
            },
          }}
      />
  )
})
