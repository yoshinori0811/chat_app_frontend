import React from 'react'
import { NavData } from './NavData'
import './Navbar.scss'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav>
        <ul className='navbar'>
            {NavData.map((v, i) => {
                return (
                    <Link to={v.link} key={i}>
                        <li>
                            <div>{v.title}</div>
                        </li>
                    </Link>
                )
            })}
        </ul>
    </nav>
  )
}
