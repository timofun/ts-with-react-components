import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'
import TransRadio from './index'

const defaultRadio = () => (
  <Radio>Radio</Radio>
)

const disabledRadio = () => (
  <>
    <Radio disabled>
      Radio
    </Radio>
    <Radio disabled checked>
      Radio Disabled
    </Radio>
  </>
)

const groupRadio = () => {
  // const [value, setValue] = useState(1)
  // const onChange = (e: any) => {
  //   setValue(e.target.value)
  // }
  // useEffect(() => {
  //   console.log(value)
  // }, [value])
  return (
    <TransRadio.Group defaultValue={1} className="test">
      <Radio value={1}>Radio1</Radio>
      <Radio value={2}>Radio2</Radio>
      <Radio value={3}>Radio3</Radio>
      <Radio value={4} disabled>Radio4</Radio>
    </TransRadio.Group>
  )
}

const groupRadioButton = () => (
  <TransRadio.Group defaultValue={1} optionType="button" buttonStyle="solid" className="test-radio-button">
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
