import { createContext, PropsWithChildren, useContext } from 'react';
import { FieldError } from 'react-hook-form';

export type FormErrorProviderProps = {
  onError: (error: FieldError) => string | undefined;
}

const FormErrorProviderContext = createContext<FormErrorProviderProps>({
  onError: (error) => error?.message
})

export const FormErrorProvider = (props: PropsWithChildren<FormErrorProviderProps>) => {
  const {onError, children} = props;
  return (
      <FormErrorProviderContext.Provider value={{onError}}>
        {children}
      </FormErrorProviderContext.Provider>
  )
}

export const useFormError = () => {
  const errorCtx = useContext<FormErrorProviderProps>(FormErrorProviderContext);
  return errorCtx?.onError;
}
