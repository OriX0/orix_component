/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import {
  Children,
  cloneElement,
  createContext,
  FunctionComponentElement,
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menu-item';

type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (index: number) => void;
export interface MenuProps {
  className?: string;
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
}
// context的接口
interface IMenuContext {
  index: number;
  onSelect?: selectCallback;
  mode?: MenuMode;
}
// 创建context
const MenuContext = createContext<IMenuContext>({ index: 0 });
// 前置错误处理
export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('必须在MenuProvider 内使用 useMenu');
  }
  return context;
}
const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, style, onSelect, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames(className, 'oriX-menu', {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });
  // 定义回调函数
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const transmitValue: IMenuContext = {
    index: currentActive ?? 0,
    onSelect: handleClick,
    mode,
  };
  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(childElement, { index });
      } else {
        console.warn('warning: this child not MenuItem');
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={transmitValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0,
};

export default Menu;
