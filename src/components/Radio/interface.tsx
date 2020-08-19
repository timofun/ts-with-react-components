import * as React from 'react';
export type RadioGroupButtonStyle = 'outline' | 'solid';
export type RadioGroupOptionType = 'default' | 'button';
export type SizeType = 'sm' | 'mid' | 'lg' | undefined;
export interface RadioGroupProps {
  /** 自定义preClass */
  prefixCls?: string;
  /** 自定义class */
  className?: string;
  /** 自定义class */
  disabled?: boolean;
  /** 自定义class */
  style?: React.CSSProperties;
  /** 自定义class */
  defaultValue?: any;
  /** 自定义class */
  value?: any;
  /** 自定义class */
  onChange?: (e: RadioChangeEvent) => void;
  /** 自定义class */
  size?: SizeType;
  /** 自定义class */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** 自定义class */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** 自定义class */
  name?: string;
  /** 自定义class */
  children?: React.ReactNode;
  /** 自定义class */
  id?: string;
  /** 自定义class */
  optionType?: RadioGroupOptionType;
  /** 自定义class */
  buttonStyle?: RadioGroupButtonStyle;
}

export interface RadioGroupContextProps {
  onChange: (e: RadioChangeEvent) => void;
  value: any;
  disabled?: boolean;
  name?: string;
}

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

export type RadioProps = AbstractCheckboxProps<RadioChangeEvent>;

export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}

export interface RadioChangeEvent {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null);
