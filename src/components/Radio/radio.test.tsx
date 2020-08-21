import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { RadioGroupProps, RadioProps } from './interface'
import Radio from './radio'
import RadioGroup from './group'

const defaultProps = {
  onClick: jest.fn(),
}

const disabledProps: RadioProps = {
  checked: true,
  disabled: true,
  onClick: jest.fn(),
}

const defaultGroupProps: RadioGroupProps = {
  defaultValue: 1,
  className: 'test'
}


const generateRadioGroup = (props: RadioGroupProps) => {
  return(
    <RadioGroup {...props}>
      <Radio value={1}>radio1</Radio>
      <Radio value={2}>radio2</Radio>
      <Radio value={3} disabled>radio3</Radio>
    </RadioGroup>
  )
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
  it('should render correct disabled radio', () => {
    wrapper = render(<Radio {...disabledProps}>disabled radio</Radio>)
    radioElement = wrapper.container.querySelector('.funs-radio-disabled') as HTMLElement
    inputElement = wrapper.container.querySelector('.funs-radio-input') as HTMLInputElement
    expect(wrapper.queryByLabelText('disabled radio')).toBeTruthy();
    expect(inputElement.disabled).toBeTruthy()
    expect(radioElement).toHaveClass('funs-radio funs-radio-checked funs-radio-disabled')
  })
  it('should render correct radioGroup', () => {
    wrapper = render(generateRadioGroup(defaultGroupProps))
    const baseElement = wrapper.container.querySelector('.funs-radio-group') as HTMLElement
    expect(baseElement).toHaveClass('funs-radio-group funs-radio-group-outline test')
    expect(baseElement.querySelectorAll(':scope > label').length).toEqual(3)
  })
  it('should render correct click radio in radioGroup', () => {
    wrapper = render(generateRadioGroup(defaultGroupProps))
    const firstElement = wrapper.container.querySelector('.funs-radio-wrapper') as HTMLElement
    const selectedElement = wrapper.container.querySelector('.funs-radio-wrapper-checked') as HTMLElement
    const inputInSelectedElement = wrapper.container.querySelector('.funs-radio-input') as HTMLInputElement
    expect(inputInSelectedElement.value).toEqual('1')
    radioElement = wrapper.getByText('radio2') as HTMLElement
    fireEvent.click(radioElement)
    expect(firstElement).not.toHaveClass('.funs-radio-wrapper-checked')
  })
})
