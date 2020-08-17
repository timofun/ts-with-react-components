import React from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'

const defaultRadio = () => (
  <Radio>
    Radio
  </Radio>
)

const disabledRadio = () => (
  <Radio disabled>
    Radio
  </Radio>
)

storiesOf('Radio Component', module)
  .add('Radio', defaultRadio)
  .add('disabled radio', disabledRadio)
