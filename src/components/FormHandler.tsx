import { FormHandlerProps, SafeAny } from "@models/dataModel";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

export const FormHandler = <T = any>(props: FormHandlerProps<T>) => {
  const {onSubmit, children, formId, ...otherProps} = props;
  const methods = useForm<FieldValues, T>(otherProps);

  return (
      <form id={formId} onSubmit={methods.handleSubmit(onSubmit as SafeAny)}>
        <FormProvider {...methods}>
          {typeof children == "function" ? children(methods) : children}
        </FormProvider>
      </form>
  );
};
