import React from 'react'
import classNames from 'classnames'
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select'
import { OptionProps } from 'rc-select/lib/Option'
import SizeContext, { SizeType } from '../configProvider/sizeContext'
import { ConfigConsumer, ConfigConsumerProps } from '../configProvider/context'
import ValueType = WebAssembly.ValueType

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
    } = this.props as InternalSelectProps<ValueType>;
    
    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const mode = this.getMode();
    
    const isMultiple = mode === 'multiple' || mode === 'tags';
    
    // ===================== Empty =====================
    let mergedNotFound: React.ReactNode;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else if (mode === 'combobox') {
      mergedNotFound = null;
    } else {
      mergedNotFound = renderEmpty('Select');
    }
    
    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
      multiple: isMultiple,
      prefixCls,
    });
    
    const selectProps = omit(this.props, [
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
              ref={this.selectRef}
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
