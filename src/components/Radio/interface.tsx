import * as React from 'react';
import { AbstractCheckboxProps } from '../Checkbox/checkbox'
export type RadioGroupButtonStyle = 'outline' | 'solid';
export type RadioGroupOptionType = 'default' | 'button';
export type SizeType = 'sm' | 'mid' | 'lg' | undefined;
export interface RadioGroupProps {
  /** 自定义preClass */
  prefixCls?: string;
  /** 自定义class */
  className?: string;
  /** 是否禁止点击 */
  disabled?: boolean;
  /** 样式 */
  style?: React.CSSProperties;
  /** 默认选中 */
  defaultValue?: any;
  /** radio值 */
  value?: any;
  /** change回调 */
  onChange?: (e: RadioChangeEvent) => void;
  /** radio大小 */
  size?: SizeType;
  /** 鼠标移入事件 */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** 鼠标移出事件 */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** 自定义name */
  name?: string;
  /** 自定义children */
  children?: React.ReactNode;
  /** 自定义id */
  id?: string;
  /** radio类型 */
  optionType?: RadioGroupOptionType;
  /** radio button类型 */
  buttonStyle?: RadioGroupButtonStyle;
}

export interface RadioGroupContextProps {
  onChange: (e: RadioChangeEvent) => void;
  value: any;
  disabled?: boolean;
  name?: string;
  optionType?: RadioGroupOptionType;
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
