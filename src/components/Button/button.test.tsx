/*
 * @description: 
 * @Author: OriX
 * @LastEditors: OriX
 */
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'
const defaultProps = {
  onClick: jest.fn() // 返回undefined的mock 函数
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}
describe('test Button component', () => {
  it('should render  default button', () => {
    // 包装的render组件
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    // 根据条件找到对应的render组件
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    // 在document 节点上
    expect(element).toBeInTheDocument()
    // tagName是否为button
    expect(element.tagName).toEqual('BUTTON')
    // 有指定class属性
    expect(element).toHaveClass('btn btn-default')
    // 没有disabled属性
    expect(element.disabled).toBeFalsy()
    // 点击element
    fireEvent.click(element)
    // 对应的onclick 函数被调用
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  // 传入class  props不同
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href="https://blog.ori8.cn">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  // 测试disable
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})