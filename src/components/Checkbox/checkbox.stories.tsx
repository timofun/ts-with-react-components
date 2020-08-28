import React, { FC, useState } from 'react'
import { storiesOf } from '@storybook/react'
import CheckBox, { CheckboxProps } from './checkbox'
import Button from '../Button/button'

const defaultCheckbox = () => (
  <CheckBox>defaultCheckbox</CheckBox>
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
        <CheckBox checked={checked} disabled={disabled}>defaultCheckbox</CheckBox>
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

storiesOf('Checkbox Component', module)
  .add('defaultCheckbox', defaultCheckbox)
  .add('linkedCheckbox', linkedCheckbox)
