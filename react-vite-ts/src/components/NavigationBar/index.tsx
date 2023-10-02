import React from 'react'
import style from './NavigationBar.module.css'
import { navsList } from './data'
import { Link } from 'react-router-dom';

type SingleType={
  id:number,
  label:string,
  url:string,
}

type NaviItemType ={
  id:number,
  label:string,
  url:string,
  childs:SingleType[]
}

function NaviItem({item}:{item:NaviItemType}){
  return(
    <li>
    {/* <a href={item.url}>{item.label}</a> */}
    <Link to={item.url}>{item.label}</Link>
    {
      item.childs && item.childs.length>0? (
        <div className={style.nav_child}>
            {
              item.childs.map(child =>{
                return(
                  <a href={child?.url}>{child.label}</a>
                )
              })
            }
        </div>
      )
      : null
    }
     
  </li>
  )
}
const NavigationBar = () => {
  return (
    <nav className={style.main_navigation}>
    <ul>
      {
        navsList .map((item)=><NaviItem key ={item.id} item={item}/>)
      }
    </ul>
  </nav>
  )
}

export default NavigationBar