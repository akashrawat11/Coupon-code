import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css';

export default function Home() {
  return (
    <div className='Home'>
        <ul>
            <Link to = "/coupons" className='Link'>All Coupons</Link>
            <Link to = "/create" className='Link'>Create New</Link>
            <Link to = "/getdiscount" className='Link'>Calculate Discount</Link>
        </ul>
    </div>
  )
}
