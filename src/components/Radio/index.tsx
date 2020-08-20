import Radio from './radio'
import RadioGroup from './group'
import { RadioGroupProps, RadioProps } from './interface'
import { FC } from 'react'
export * from './interface';
export type IRadioComponent = FC<RadioProps> & {
  Group: FC<RadioGroupProps>
}
const TransRadio = Radio as IRadioComponent
TransRadio.Group = RadioGroup
export default TransRadio
