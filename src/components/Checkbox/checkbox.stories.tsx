import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from './checkbox'
import Button from '../Button/button'
import CheckboxGroup from './group'

const defaultCheckbox = () => (
  <Checkbox>defaultCheckbox</Checkbox>
)

// eslint-disable react-hooks/rules-of-hooks
const linkedCheckbox = () => {
  const [checked, setCheck] = useState(false)
  const [disabled, setDisabled] = useState(false)
  
  const toggleChecked = () => {
    setCheck(!checked)
  }
  
  const toggleDisable = () => {
    setDisabled(!disabled)
  }
  return (
    <>
      <p>
        <Checkbox checked={checked} disabled={disabled}>defaultCheckbox</Checkbox>
      </p>
      <p>
        <Button onClick={toggleChecked}>
          {!checked ? 'Check' : 'Uncheck'}
        </Button>
        <Button onClick={toggleDisable}>
          {!disabled ? 'disabled' : 'Undisabled'}
        </Button>
      </p>
    </>
  )
}

const checkboxGroup = () => {
  return (
    <CheckboxGroup>
      <Checkbox>checkbox1</Checkbox>
      <Checkbox>checkbox2</Checkbox>
      <Checkbox>checkbox3</Checkbox>
    </CheckboxGroup>
  )
}

storiesOf('Checkbox Component', module)
  .add('defaultCheckbox', defaultCheckbox)
  .add('linkedCheckbox', linkedCheckbox)
  .add('checkboxGroup', checkboxGroup)
