import React, { FC } from 'react'
import { ButtonProps } from './types'

const Button: FC<ButtonProps> = ({children}) => {
  return (
    <button type="submit">
      {children}
    </button>
  )
}

export default Button
