/*
 * @description: 
 * @Author: OriX
 * @LastEditors: OriX
 */
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menu-item'

// 默认test-props
const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}
// 竖直  menu
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >
        active
      </MenuItem>
      <MenuItem  disabled>
        disabled
      </MenuItem>
      <MenuItem >
        xyz
      </MenuItem>
    </Menu>
  )
}
// 声明变量
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    // 生成 menu wrapper 容器
    wrapper = render(generateMenu(testProps))
    // 获取menu 本身组件
    menuElement= wrapper.getByTestId('test-menu')
    /**或者通过 wrapper.container.getXxx方法去获取 */
    // 获取 active element
    activeElement = wrapper.getByText('active')
    // 获取disabled element
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('oriX-menu test')
    // 判断里面有3个li
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // 判断element 有对应的class
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    // case 中共享wrapper
    const thirdItem = wrapper.getByText('xyz')
    // 点击第三个元素
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    // 被调用 且传入的参数为2
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical',()=>{
    cleanup();
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
