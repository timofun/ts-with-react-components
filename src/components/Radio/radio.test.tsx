import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { RadioProps } from './interface'
import Radio from './radio'

const defaultProps = {
  onClick: jest.fn(),
}

const disabledProps: RadioProps = {
  disabled: true,
  onClick: jest.fn(),
}

let wrapper: RenderResult, radioElement: HTMLElement, inputElement: HTMLInputElement
describe('test Radio component', () => {
  it('should render correct default Radio', () => {
    wrapper = render(<Radio {...defaultProps}>default radio</Radio>)
    radioElement = wrapper.container.querySelector('.funs-radio') as HTMLElement
    inputElement = wrapper.container.querySelector('.funs-radio-input') as HTMLInputElement
    expect(wrapper.queryByLabelText('default radio')).toBeTruthy();
    fireEvent.click(wrapper.getByLabelText('default radio'))
    expect(radioElement).toHaveClass('funs-radio funs-radio-checked')
  })
})
