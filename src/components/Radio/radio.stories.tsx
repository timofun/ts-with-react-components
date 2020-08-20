import React from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'
import RadioGroup from './group'

const defaultRadio = () => (
  <>
    <Radio>Radio1</Radio>
    <Radio>Radio2</Radio>
  </>
)

const disabledRadio = () => (
  <Radio disabled checked>
    Radio
  </Radio>
)

const GroupRadio = () => (
  <RadioGroup>
    <Radio value={1}>Radio1</Radio>
    <Radio value={2}>Radio2</Radio>
  </RadioGroup>
)

storiesOf('Radio Component', module)
  .add('Radio', defaultRadio)
  .add('disabled radio', disabledRadio)
  .add('RadioGroup', GroupRadio)
