import React, { FC } from 'react'
import RcCheckbox from 'rc-checkbox'
import classNames from 'classnames'
import { RadioProps, RadioChangeEvent, RadioGroupContext } from './interface'

export const Radio: FC<RadioProps> = (props) => {
  const context = React.useContext(RadioGroupContext);
  
  const onChange = (e: RadioChangeEvent) => {
    if (props.onChange) {
      props.onChange(e);
    }
    
    // if (context?.onChange) {
    //   context.onChange(e);
    // }
  };
  
  const {
    prefixCls: customizePrefixCls,
    disabled,
    checked,
    children,
    className,
    style,
    ...restProps
  } = props
  const radioProps: RadioProps = { ...restProps };
  if (context) {
    radioProps.name = context.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }
  const headerClass = 'funs-radio'
  const classes = classNames(`${headerClass}-wrapper`, className, {
    [`${headerClass}-disabled`]: disabled,
    [`${headerClass}-checked`]: checked
  })
  
  return (
    <label className={classes}>
      <RcCheckbox disabled={disabled} {...radioProps} prefixCls="funs-radio" />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

Radio.defaultProps = {
  type: 'radio'
}

export default Radio


