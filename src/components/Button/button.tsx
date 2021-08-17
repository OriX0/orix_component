/*
 * @description: 
 * @Author: OriX
 * @LastEditors: OriX
 */

import React from "react";
import classNames from "classnames";

export enum BtnSize {
  Large='lg',
  Small='sm'
}
export enum BtnType {
  Primary='primary',
  Default='default',
  Danger='danger',
  Link='link'
}

interface BaseButtonProps  {
  className?:string,
  disable?:boolean,
  size?:BtnSize,
  btnType?:BtnType,
  children?:React.ReactNode,
  href?:string
}
type NativeButtonProps =BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> ;
type AnchorButtonProps =BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement> ;
export type ButtonProps =Partial<NativeButtonProps & AnchorButtonProps> ;
const Button:React.FC<ButtonProps> = (props)=>{
  const {disable,size,btnType,children,href,className,...resetProps} = props;
  const classes = classNames(className,'btn',{
    [`btn-${btnType}`] : btnType,
    [`btn-${size}`] : size,
    // 对 link btn进行单独处理
    'disabled': (btnType === BtnType.Link) && disable
  })
  if(btnType===BtnType.Link){
    return <a className={classes} href={href} {...resetProps}>{children}</a>
  }
  return <button className={classes} disabled={disable} {...resetProps}>{children}</button>
}

Button.defaultProps = {
  disable:false,
  btnType:BtnType.Default,
}
export default Button