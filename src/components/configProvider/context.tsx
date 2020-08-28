import React from 'react'

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    
    return suffixCls ? `funs-${suffixCls}` : 'funs'
  }
})

export const ConfigConsumer = ConfigContext.Consumer
