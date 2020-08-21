import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { RadioGroupProps, RadioGroupContext, RadioChangeEvent } from './interface'
import { ConfigContext } from '../configProvider/context'

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext)
  const [value, setValue] = useState(props.defaultValue)
  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value
    const val = ev.target.value
    if (!('value' in props)) {
      setValue(val)
    }
    const { onChange } = props
    if (onChange && val !== lastValue) {
      onChange(ev)
    }
  }
  const renderGroup = () => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      buttonStyle,
      children,
      style,
      id,
      onMouseEnter,
      onMouseLeave
    } = props
    const prefixCls = getPrefixCls('radio', customizePrefixCls)
    const groupPrefixCls = `${prefixCls}-group`
    let childrenToRender = children
    
    const classString = classNames(
      groupPrefixCls,
      `${groupPrefixCls}-${buttonStyle}`,
      className
    )
    return (
      <div
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
      >
        {childrenToRender}
      </div>
    )
  }
  return (
    <RadioGroupContext.Provider
      value={{
        onChange: onRadioChange,
        value,
        disabled: props.disabled,
        name: props.name
      }}
    >
      {renderGroup()}
    </RadioGroupContext.Provider>
  )
}

RadioGroup.defaultProps = {
  buttonStyle: 'outline'
}

export default RadioGroup