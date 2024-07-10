import { FormEventHandler, FormHTMLAttributes, PropsWithChildren } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn
} from 'react-hook-form';

export type FormContainerProps<T extends FieldValues = FieldValues> =
    PropsWithChildren<UseFormProps<T> & {
      onSuccess?: SubmitHandler<T>
      onError?: SubmitErrorHandler<T>
      FormProps?: FormHTMLAttributes<HTMLFormElement>
      handleSubmit?: FormEventHandler<HTMLFormElement>
      formContext?: UseFormReturn<T>
    }>

export const FormContainer = <
    TFieldValues extends FieldValues = FieldValues
>(
    props: PropsWithChildren<FormContainerProps<TFieldValues>>
) => {
  const {
    handleSubmit,
    children,
    FormProps,
    formContext,
    onSuccess,
    onError,
    ...useFormProps
  } = props;

  if (!formContext) {
    return (
        <FormProviderWithoutContext<TFieldValues>
            {...{
              onSuccess,
              onError,
              FormProps,
              children,
              ...useFormProps
            }}/>
    )
  }
  if (typeof onSuccess === 'function' && typeof handleSubmit === 'function') {
    console.warn('Property `onSuccess` will be ignored because handleSubmit is provided');
  }
  return (
      <FormProvider {...formContext}>
        <form
            noValidate
            {...FormProps}
            onSubmit={
              handleSubmit
                  ? handleSubmit
                  : onSuccess
                      ? formContext.handleSubmit(onSuccess, onError)
                      : () => console.log('submit handler `onSuccess` is missing')
            }>
          {children}
        </form>
      </FormProvider>
  )
}

const FormProviderWithoutContext = <
    TFieldValues extends FieldValues = FieldValues
>(props: PropsWithChildren<FormContainerProps<TFieldValues>>
) => {
  const {
    onSuccess,
    onError,
    FormProps,
    children,
    ...useFormProps
  } = props;

  const methods = useForm<TFieldValues>({...useFormProps});
  const {handleSubmit} = methods;

  return (
      <FormProvider {...methods}>
        <form
            onSubmit={handleSubmit(
                onSuccess
                    ? onSuccess
                    : () => console.log('submit handler `onSuccess` is missing'),
                onError
            )}
            noValidate
            {...FormProps}        >
          {children}
        </form>
      </FormProvider>
  )
}
