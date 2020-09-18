import React, { useState } from 'react'
import classNames from 'classnames'
import omit from 'omit.js'
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select'
import { OptionProps } from 'rc-select/lib/Option'
import SizeContext, { SizeType } from '../configProvider/sizeContext'
import { ConfigConsumer, ConfigConsumerProps } from '../configProvider/context'
import ValueType = WebAssembly.ValueType
import getIcons from '../utils/iconUtil'

type RawValue = string | number;

// export { OptionProps }

export type OptionType = typeof Option;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

// @ts-ignore
export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  bordered?: boolean;
}

export interface SelectProps<VT> extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
  mode?: 'multiple' | 'tags';
}

const Select: React.FC<SelectProps<SelectValue>> = (props) => {
  const [option, setOption] = useState(Option)
  
  const [optGroup, setOptGroup] = useState(OptGroup)

  const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  const defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    bordered: true,
  };
  
  // @ts-ignore
  const selectRef = React.createRef<RcSelect<ValueType>>();
  const focus = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  const blur = () => {
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };
  
  const getMode = () => {
    const { mode } = props as InternalSelectProps<ValueType>;
    
    if ((mode as any) === 'combobox') {
      return undefined;
    }
    
    if (mode === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    
    return mode;
  };
  const renderSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      notFoundContent,
      className,
      size: customizeSize,
      listHeight = 256,
      listItemHeight = 24,
      getPopupContainer,
      dropdownClassName,
      bordered,
    } = props as InternalSelectProps<ValueType>;
    
    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const mode = getMode();
    
    const isMultiple = mode === 'multiple' || mode === 'tags';
    
    // ===================== Empty =====================
    let mergedNotFound: React.ReactNode;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else if (mode === 'combobox') {
      mergedNotFound = null;
    } else {
      // mergedNotFound = renderEmpty('Select');
    }
    
    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...props,
      multiple: isMultiple,
      prefixCls,
    });
    
    const selectProps = omit(props, [
      'prefixCls',
      'suffixIcon',
      'itemIcon',
      'removeIcon',
      'clearIcon',
      'size',
      'bordered',
    ]);
    
    const rcSelectRtlDropDownClassName = classNames(dropdownClassName, {
      [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
    });
    return (
      <SizeContext.Consumer>
        {size => {
          const mergedSize = customizeSize || size;
          const mergedClassName = classNames(className, {
            [`${prefixCls}-lg`]: mergedSize === 'large',
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-rtl`]: direction === 'rtl',
            [`${prefixCls}-borderless`]: !bordered,
          });
          
          return (
            <RcSelect<ValueType>
              ref={selectRef}
              virtual={virtual}
              dropdownMatchSelectWidth={dropdownMatchSelectWidth}
              {...selectProps}
              listHeight={listHeight}
              listItemHeight={listItemHeight}
              mode={mode}
              prefixCls={prefixCls}
              direction={direction}
              inputIcon={suffixIcon}
              menuItemSelectedIcon={itemIcon}
              removeIcon={removeIcon}
              clearIcon={clearIcon}
              notFoundContent={mergedNotFound}
              className={mergedClassName}
              getPopupContainer={getPopupContainer || getContextPopupContainer}
              dropdownClassName={rcSelectRtlDropDownClassName}
            />
          );
        }}
      </SizeContext.Consumer>
    );
  };
  
    return <ConfigConsumer>{renderSelect}</ConfigConsumer>;
}

export default Select
