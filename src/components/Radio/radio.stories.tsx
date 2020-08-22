import React from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'
import TransRadio from './index'

const defaultRadio = () => (
  <Radio>Radio</Radio>
)

const disabledRadio = () => (
  <Radio disabled checked>
    Radio
  </Radio>
)

const groupRadio = () => (
  <TransRadio.Group defaultValue={1}>
    <Radio value={1}>Radio1</Radio>
    <Radio value={2}>Radio2</Radio>
    <Radio value={3} disabled>Radio3</Radio>
  </TransRadio.Group>
)

const groupRadioButton = () => (
  <TransRadio.Group defaultValue={3} optionType="button" buttonStyle="solid">
    <Radio value={1}>Radio1</Radio>
    <Radio value={2}>Radio2</Radio>
    <Radio value={3} disabled>Radio3</Radio>
  </TransRadio.Group>
)

storiesOf('Radio Component', module)
  .add('Radio', defaultRadio)
  .add('disabled radio', disabledRadio)
  .add('RadioGroup', groupRadio)
  .add('RadioButton', groupRadioButton)
