import React, { FC, useContext } from 'react'
import RcCheckbox from 'rc-checkbox'
import classNames from 'classnames'
import { RadioProps, RadioChangeEvent, RadioGroupContext } from './interface'
import { ConfigContext } from '../configProvider/context'

export const Radio: FC<RadioProps> = (props) => {
  const context = React.useContext(RadioGroupContext)
  const { getPrefixCls } = useContext(ConfigContext)
  const onChange = (e: RadioChangeEvent) => {
    if (props.onChange) {
      props.onChange(e)
    }
    
    if (context?.onChange) {
      context.onChange(e)
    }
  }
  
  const {
    prefixCls: customizePrefixCls,
    children,
    className,
    style,
    ...restProps
  } = props
  const radioProps: RadioProps = { ...restProps }
  let prefixCls = getPrefixCls('radio', customizePrefixCls)
  if (context) {
    radioProps.name = context.name
    radioProps.onChange = onChange
    radioProps.checked = props.value === context.value
    radioProps.disabled = props.disabled || context.disabled
    if (context.optionType === 'button') {
      prefixCls = getPrefixCls('radio-button', customizePrefixCls)
    }
  }
  const classes = classNames(`${prefixCls}-wrapper`, className, {
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-checked`]: radioProps.checked
  })
  
  return (
    <label className={classes}>
      <RcCheckbox {...radioProps} prefixCls={prefixCls}/>
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  )
}

Radio.defaultProps = {
  type: 'radio'
}

export default Radio


