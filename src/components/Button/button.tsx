/*
 * @description: 
 * @Author: OriX
 * @LastEditors: OriX
 */

import React from "react";
import classNames from "classnames";

export type BtnSize = 'lg' | 'sm'
export type BtnType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps  {
  className?:string,
  disable?:boolean,
  size?:BtnSize,
  btnType?:BtnType,
  children?:React.ReactNode,
  href?:string
}
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> ;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> ;
export type ButtonProps =Partial<NativeButtonProps & AnchorButtonProps> & BaseButtonProps;
const Button:React.FC<ButtonProps> = (props)=>{
  const {disable,size,btnType,children,href,className,...resetProps} = props;
  const classes = classNames(className,'btn',{
    [`btn-${btnType}`] : btnType,
    [`btn-${size}`] : size,
    // 对 link btn进行单独处理
    'disabled': (btnType === 'link') && disable
  })
  if(btnType==='link'){
    return <a className={classes} href={href} {...resetProps}>{children}</a>
  }
  return <button className={classes} disabled={disable} {...resetProps}>{children}</button>
}

Button.defaultProps = {
  disable:false,
  btnType:'default',
}
export default Button