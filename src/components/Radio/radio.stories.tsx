import React from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'

const defaultRadio = () => (
  <Radio>
    Radio
  </Radio>
)

storiesOf('Radio Component', module)
  .add('Radio', defaultRadio)
