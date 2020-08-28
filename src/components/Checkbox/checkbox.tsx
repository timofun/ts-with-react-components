import React, { FC, useEffect } from 'react'
import RcCheckbox from 'rc-checkbox'
import classNames from 'classnames'
import { ConfigConsumer, ConfigConsumerProps } from '../configProvider/context'
import devWarning from '../utils/devWarning'

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export const Checkbox: FC<CheckboxProps> = (props: CheckboxProps) => {
  
  let context: any
  let rcCheckbox: any
  
  useEffect(() => {
    const { value } = props
    context?.registerValue(value)
    
    devWarning(
      'checked' in props || context || !('value' in props),
      'Checkbox',
      '`value` is not a valid prop, do you mean `checked`?'
    )
  }, [])
  
  const renderCheckbox = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      ...restProps
    } = props
    
    const saveCheckbox = (node: any) => {
      rcCheckbox = node
    }
    
    // const focus = () => {
    //   rcCheckbox.focus()
    // }
    //
    // const blur = () => {
    //   rcCheckbox.blur()
    // }
    //
    const checkboxGroup = context
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls)
    const checkboxProps: CheckboxProps = { ...restProps }
    if (checkboxGroup) {
      checkboxProps.onChange = (...args) => {
        if (restProps.onChange) {
          restProps.onChange(...args)
        }
        checkboxGroup.toggleOption({ label: children, value: props.value })
      }
      checkboxProps.name = checkboxGroup.name
      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled
    }
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled
    })
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate
    })
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          ref={saveCheckbox}
        />
        {children !== undefined && <span>{children}</span>}
      </label>
    )
  }
  
  return (
    <ConfigConsumer>
      {renderCheckbox}
    </ConfigConsumer>
  )
}

export default Checkbox
