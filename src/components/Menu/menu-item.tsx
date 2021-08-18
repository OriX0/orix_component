/*
 * @description: 
 * @Author: OriX
 * @LastEditors: OriX
 */
import classNames from "classnames";
import {useMenu} from './menu'

export interface MenuItemProps {
  index?:number,
  className?:string,
  disabled?:boolean,
  style?:React.CSSProperties
}
const MenuItem:React.FC<MenuItemProps> = (props) =>{
  const {index,className,disabled,style,children} = props;
  const {index:currentIndex,onSelect}= useMenu();
  const classes = classNames(className,'menu-item',{
    'is-disabled':disabled,
    'is-active':currentIndex===index
  })
  const handleClick = ()=>{
    // 如果有onSelect函数 且 disabled为假
    if(onSelect&& !disabled && typeof index ==='number' ){
      onSelect(index)
    }
  }
  return <li className={classes} style={style} onClick={handleClick}>
    {children}
  </li>
}
MenuItem.displayName = 'MenuItem'
export default MenuItem;