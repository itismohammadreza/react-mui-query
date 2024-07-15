import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers';

export const DateFnsProvider = ({children, ...props}: LocalizationProviderProps<Date, any>) => {
  const {dateAdapter, ...localizationProps} = props
  return (
      <LocalizationProvider dateAdapter={dateAdapter} {...localizationProps}>
        {children}
      </LocalizationProvider>
  )
}
