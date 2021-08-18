/*
 * @description: 
 * @Author: OriX
 * @LastEditors: OriX
 */
import classNames from "classnames";
import { Children, FunctionComponentElement } from "react";
import { useMenu} from './menu'
import {MenuItemProps} from './menu-item'

interface SubMenuProps {
  index?:number,
  title:string,
  className?:string,
}
const SubMenu:React.FC<SubMenuProps> = ({index,title,className,children})=>{  
  const {index:currentIndex} = useMenu();
  const classes = classNames(className,'menu-item submenu-item',{
    'is-active':currentIndex===index
  })
  // child render 
  const renderChildren = ()=>{
    const childrenComponent = Children.map(children,(child,index)=>{
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem') {
        return childElement;
      }else {
        console.warn('warning: this child not MenuItem')
      }
    })
    return (
      <ul className={'oriX-submenu'}>
        {childrenComponent}
      </ul>
    )
  }
  return <li className={classes} key={index}>
    {/* title */}
    <div className={'menu-title'}>{title}</div>
    {/* child */}
    {renderChildren()}
  </li>
}

SubMenu.displayName = 'SubMenu'
export default SubMenu;