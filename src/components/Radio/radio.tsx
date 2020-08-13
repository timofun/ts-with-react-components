import React, { FC } from 'react'
import RcCheckbox from 'rc-checkbox'
import classNames from 'classnames'

type RadioSize = 'lg' | 'middle' | 'sm'

interface RadioProps {
  size?: RadioSize,
  disabled?: boolean,
  children: React.ReactNode,
  className?: string
}

export const Radio: FC<RadioProps> = (props) => {
  const {
    size,
    disabled,
    children,
    className,
    ...restProps
  } = props
  
  const classes = classNames('funs-radio', className, {
    [`funs-radio-${size}`]: size,
    'disabled': disabled
  })
  
  return (
    <label>
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

export default Radio


