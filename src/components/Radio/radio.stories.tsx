import React from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'

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

storiesOf('Radio Component', module)
  .add('Radio', defaultRadio)
  .add('disabled radio', disabledRadio)
