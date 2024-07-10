import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps
} from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteFreeSoloValueMapping,
  AutocompleteProps,
  AutocompleteValue,
  Checkbox,
  ChipTypeMap,
  CircularProgress,
  TextField,
  TextFieldProps,
  useForkRef
} from '@mui/material';
import { useFormError } from './FormErrorProvider';
import { ElementType, forwardRef, ReactNode, Ref, SyntheticEvent } from 'react';
import { useTransform } from './useTransform';
import { utilsService } from '@utils/utilsService';

type AutoDefault = {
  id: string | number;
  label: string;
}

export type AutocompleteElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = AutoDefault | string | any,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends ElementType = ChipTypeMap['defaultComponent'],
> = {
  name: TName;
  control?: Control<TFieldValues>;
  options: TValue[];
  loading?: boolean;
  multiple?: Multiple;
  loadingIndicator?: ReactNode;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  parseError?: (error: FieldError) => ReactNode;
  label?: TextFieldProps['label'];
  showCheckbox?: boolean;
  matchId?: boolean;
  autocompleteProps?: Omit<AutocompleteProps<TValue, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'name' | 'options' | 'loading' | 'renderInput'>;
  textFieldProps?: Omit<TextFieldProps, 'name' | 'required' | 'label'>;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => AutocompleteValue<TValue, Multiple, DisableClearable, FreeSolo>;
    output?: (event: SyntheticEvent, value: AutocompleteValue<TValue, Multiple, DisableClearable, FreeSolo>, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<TValue>) => PathValue<TFieldValues, TName>;
  }
}

export const AutocompleteElement = forwardRef(<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = AutoDefault | string | any,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends ElementType = ChipTypeMap['defaultComponent'],
>(
    props: AutocompleteElementProps<TFieldValues, TName, TValue, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    ref: Ref<HTMLDivElement>
) => {
  const {
    textFieldProps,
    autocompleteProps,
    name,
    control,
    options,
    loading,
    showCheckbox,
    rules,
    loadingIndicator,
    multiple,
    label,
    parseError,
    transform,
    matchId,
  } = props;

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const {field, fieldState: {error}} = useController({
    name,
    control,
    disabled: autocompleteProps?.disabled,
    rules: rules
  })

  const getOptionLabel = (option: TValue | AutocompleteFreeSoloValueMapping<FreeSolo>) => {
    if (typeof autocompleteProps?.getOptionLabel === 'function') {
      return autocompleteProps.getOptionLabel(option);
    }
    if (utilsService.propertyExists(option, 'label')) {
      return `${option?.label}`;
    }
    return `${option}`;
  }

  const isOptionEqualToValue = (option: TValue, value: TValue) => {
    if (typeof autocompleteProps?.isOptionEqualToValue == 'function') {
      return autocompleteProps.isOptionEqualToValue(option, value);
    }
    const optionKey = utilsService.propertyExists(option, 'id') ? option.id : option;
    const valueKey = utilsService.propertyExists(value, 'id') ? value.id : value;
    return optionKey === valueKey;
  }

  const matchOptionByValue = (currentValue: TValue) => {
    return options.find((option) => {
      if (matchId && utilsService.propertyExists(option, 'id')) {
        return option.id === currentValue;
      }
      return isOptionEqualToValue(option, currentValue);
    })
  }

  const {
    value,
    onChange
  } = useTransform<TFieldValues, TName, AutocompleteValue<TValue, Multiple, DisableClearable, FreeSolo>>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
          typeof transform?.input === 'function'
              ? transform.input
              : (newValue) => {
                return (
                    multiple
                        ? (Array.isArray(newValue) ? newValue : []).map(matchOptionByValue)
                        : matchOptionByValue(newValue) ?? null
                ) as AutocompleteValue<TValue, Multiple, DisableClearable, FreeSolo>
              },
      output:
          typeof transform?.output === 'function'
              ? transform.output
              : (_event: SyntheticEvent, newValue: AutocompleteValue<TValue, Multiple, DisableClearable, FreeSolo>) => {
                if (multiple) {
                  const newValues = Array.isArray(newValue) ? newValue : []
                  return (
                      matchId
                          ? newValues.map((currentValue) => utilsService.propertyExists(currentValue, 'id') ? currentValue.id : currentValue)
                          : newValues
                  ) as PathValue<TFieldValues, TName>
                }
                return (matchId && utilsService.propertyExists(newValue, 'id') ? newValue.id : newValue) as PathValue<TFieldValues, TName>
              }
    }
  })

  const handleInputRef = useForkRef(field.ref, textFieldProps?.inputRef);

  const loadingElement = loadingIndicator || (<CircularProgress color="inherit" size={20}/>)

  return (
      <Autocomplete
          {...autocompleteProps}
          value={value}
          loading={loading}
          multiple={multiple}
          options={options}
          disableCloseOnSelect={
            typeof autocompleteProps?.disableCloseOnSelect === 'boolean'
                ? autocompleteProps.disableCloseOnSelect
                : !!multiple
          }
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={getOptionLabel}
          onChange={(event, newValue, reason, details) => {
            onChange(event, newValue, reason, details)
            if (autocompleteProps?.onChange) {
              autocompleteProps.onChange(event, newValue, reason, details)
            }
          }}
          ref={ref}
          renderOption={
              autocompleteProps?.renderOption ??
              (showCheckbox
                  ? (props, option, {selected}) => {
                    return (
                        <li {...props}>
                          <Checkbox sx={{marginRight: 1}} checked={selected}/>
                          {getOptionLabel(option)}
                        </li>
                    )
                  }
                  : undefined)
          }
          onBlur={(event) => {
            field.onBlur();
            if (typeof autocompleteProps?.onBlur === 'function') {
              autocompleteProps.onBlur(event);
            }
          }}
          renderInput={(params) => (
              <TextField
                  name={name}
                  required={!!rules?.required}
                  label={label}
                  {...textFieldProps}
                  {...params}
                  error={!!error}
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    ...textFieldProps?.InputLabelProps,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                          {loading ? loadingElement : null}
                          {params.InputProps.endAdornment}
                        </>
                    ),
                    ...textFieldProps?.InputProps,
                  }}
                  inputProps={{
                    ...params.inputProps,
                    ...textFieldProps?.inputProps,
                  }}
                  helperText={
                    error
                        ? typeof customErrorFn === 'function'
                            ? customErrorFn(error)
                            : error.message
                        : textFieldProps?.helperText
                  }
                  inputRef={handleInputRef}
              />
          )}
      />
  )
})
