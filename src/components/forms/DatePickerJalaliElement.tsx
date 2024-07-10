import { DateFnsProvider } from "@components/forms/DateFnsProvider";
import { DatePickerElement, DatePickerElementProps } from "@components/forms/DatePickerElement";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { FieldPath, FieldValues } from "react-hook-form";
import { PickerValidDate } from "@mui/x-date-pickers/models";
import { forwardRef, Ref } from "react";

export const DatePickerJalaliElement = forwardRef(<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue extends PickerValidDate = PickerValidDate
>(
    props: DatePickerElementProps<TFieldValues, TName, TValue>,
    ref: Ref<HTMLDivElement>
) => {
  return (
      <DateFnsProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePickerElement {...props} ref={ref}/>
      </DateFnsProvider>
  )
})
