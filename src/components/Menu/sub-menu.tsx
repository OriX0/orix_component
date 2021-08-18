/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import classNames from 'classnames';
import React, { Children, FunctionComponentElement, useState } from 'react';
import { useMenu } from './menu';
import { MenuItemProps } from './menu-item';

interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}
const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  // context
  const { index: currentIndex, mode } = useMenu();
  const [menuOpen, setOpen] = useState(false);
  const classes = classNames(className, 'menu-item submenu-item', {
    'is-active': currentIndex === index,
  });
  const subClasses = classNames('oriX-submenu', {
    'menu-opened': menuOpen,
  });
  // click 和hover事件
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  // 做防抖处理
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvent = mode === 'vertical' && { onClick: handleClick };
  const hoverEvent = mode !== 'vertical' && {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false);
    },
  };
  // child render
  const renderChildren = () => {
    const childrenComponent = Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return childElement;
      } else {
        console.warn('warning: this child not MenuItem');
      }
    });
    return <ul className={subClasses}>{childrenComponent}</ul>;
  };
  return (
    <li className={classes} key={index} {...hoverEvent}>
      {/* title */}
      <div className={'menu-title'} {...clickEvent}>
        {title}
      </div>
      {/* child */}
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
