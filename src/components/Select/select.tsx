import React from 'react'
import classNames from 'classnames'
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select'
import { OptionProps } from 'rc-select/lib/Option'
import { SizeType } from '../configProvider/sizeContext'

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
  return (
    <>
    </>
  )
}

export default Select
