import React, { FC } from 'react'
import RcCheckbox from 'rc-checkbox'
import classNames from 'classnames'

type RadioSize = 'lg' | 'middle' | 'sm'

export interface RadioProps {
  type?: string,
  size?: RadioSize,
  checked?: boolean,
  disabled?: boolean,
  children?: React.ReactNode,
  className?: string
}

export const Radio: FC<RadioProps> = (props) => {
  const {
    size,
    disabled,
    checked,
    children,
    className,
    ...restProps
  } = props
  
  const classes = classNames('funs-radio-wrapper', className, {
    [`funs-radio-${size}`]: size,
    ['funs-radio-disabled']: disabled,
    ['funs-radio-checked']: checked
  })
  
  return (
    <label className={classes}>
      <RcCheckbox disabled={disabled} {...restProps} prefixCls="funs-radio" />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

Radio.defaultProps = {
  size: 'lg',
  type: 'radio'
}

export default Radio


