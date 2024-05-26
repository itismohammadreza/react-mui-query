import { forwardRef, MouseEvent, ReactNode, Ref, RefAttributes, useState, } from 'react'
import TextFieldElement, { TextFieldElementProps } from './TextFieldElement'
import { IconButton, IconButtonProps, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FieldPath, FieldValues } from 'react-hook-form'

export type PasswordElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
> = TextFieldElementProps<TFieldValues, TName, TValue> & {
  iconColor?: IconButtonProps['color']
  renderIcon?: (password: boolean) => ReactNode
}
type PasswordElementComponent = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: PasswordElementProps<TFieldValues, TName> &
        RefAttributes<HTMLDivElement>
) => JSX.Element
const PasswordElement = forwardRef(function PasswordEl<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
>(
    props: PasswordElementProps<TFieldValues, TName, TValue>,
    ref: Ref<HTMLDivElement>
) {
  const {
    iconColor,
    renderIcon = (password) => (password ? <Visibility/> : <VisibilityOff/>),
    ...rest
  } = props
  const [password, setPassword] = useState<boolean>(true)
  return (
      <TextFieldElement
          {...(rest as TextFieldElementProps)}
          ref={ref}
          InputProps={{
            endAdornment: (
                <InputAdornment position={'end'}>
                  <IconButton
                      onMouseDown={(e: MouseEvent<HTMLButtonElement>) =>
                          e.preventDefault()
                      }
                      onClick={() => setPassword(!password)}
                      tabIndex={-1}
                      color={iconColor ?? 'default'}
                  >
                    {renderIcon(password)}
                  </IconButton>
                </InputAdornment>
            ),
          }}
          type={password ? 'password' : 'text'}
      />
  )
})
PasswordElement.displayName = 'PasswordElement'
export default PasswordElement as PasswordElementComponent
