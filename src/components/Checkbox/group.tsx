import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import omit from 'omit.js'
import Checkbox, { CheckboxChangeEvent } from './checkbox'
import { ConfigConsumer, ConfigConsumerProps } from '../configProvider/context'

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  name?: string;
  defaultValue?: Array<CheckboxValueType>;
  value?: Array<CheckboxValueType>;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
}

export interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

export interface CheckboxGroupContext {
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
}

export const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export const checkboxGroup: FC<CheckboxGroupProps> = (props) => {
  const defaultValue = props.value || props.defaultValue || []
  const [stateValue, setStateValue] = useState(defaultValue)
  const [ registeredValues, setRegisteredValues] = useState<string[]>([])
// static defaultProps = {
//     options: [],
//   };
//
// static getDerivedStateFromProps(nextProps: CheckboxGroupProps) {
//     if ('value' in nextProps) {
//       return {
//         value: nextProps.value || [],
//       };
//     }
//     return null;
//   }
  
  const getOptions = () => {
    const { options } = props;
    // https://github.com/Microsoft/TypeScript/issues/7960
    return (options as Array<CheckboxOptionType | string>).map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;
      }
      return option;
    });
  }
  
  const cancelValue = (value: string) => {
    setRegisteredValues(registeredValues => registeredValues.filter(val => val !== value))
  };
  
  const registerValue = (value: string) => {
    setRegisteredValues((registeredValues) => [...registeredValues, value])
  };
  
  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = stateValue.indexOf(option.value);
    const value = [...stateValue];
    if (optionIndex === -1) {
      value.push(option.value);
    } else {
      value.splice(optionIndex, 1);
    }
    if (!('value' in props)) {
      setStateValue(value)
    }
    const { onChange } = props;
    if (onChange) {
      const options = getOptions();
      onChange(
        value
          .filter(val => registeredValues.indexOf(val.toString()) !== -1)
          .sort((a, b) => {
            const indexA = options.findIndex(opt => opt.value === a);
            const indexB = options.findIndex(opt => opt.value === b);
            return indexA - indexB;
          }),
      );
    }
  };
  const renderGroup = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, style, options, ...restProps } = props;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;
    
    const domProps = omit(restProps, ['children', 'defaultValue', 'value', 'onChange', 'disabled']);
    
    let { children } = props;
    if (options && options.length > 0) {
      children = getOptions().map(option => (
        <Checkbox
          prefixCls={prefixCls}
          key={option.value.toString()}
          disabled={'disabled' in option ? option.disabled : props.disabled}
          value={option.value}
          checked={stateValue.indexOf(option.value) !== -1}
          onChange={option.onChange}
          className={`${groupPrefixCls}-item`}
          style={option.style}
        >
          {option.label}
        </Checkbox>
      ));
    }
    
    const context = {
      toggleOption: toggleOption,
      value: stateValue,
      disabled: props.disabled,
      name: props.name,
      
      // https://github.com/ant-design/ant-design/issues/16376
      registerValue: registerValue,
      cancelValue: cancelValue,
    };
    
    const classString = classNames(groupPrefixCls, className, {
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    });
    return (
      <div className={classString} style={style} {...domProps}>
        <GroupContext.Provider value={context}>{children}</GroupContext.Provider>
      </div>
    );
  };
  return (
    <ConfigConsumer>{renderGroup}</ConfigConsumer>
  )
}
