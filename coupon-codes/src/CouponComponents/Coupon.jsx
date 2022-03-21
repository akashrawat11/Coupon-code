import React from 'react'
import '../App.css';

export default function Coupon({props}) {
  return (
    <div>
        <ul className='couponlist'>
            <li>Minimum amount to apply Coupon: {props.minamount}</li>
            <li>Maximum of {props.maxdiscount} amount can be reduced.</li>
            <li>Coupon Code: {props.id}</li>
            <li>Valid from {props.startdate} to {props.enddate}</li>
        </ul>
    </div>
  )
}
