import React, {useState, useEffect} from 'react'
import Coupon from './Coupon';
import '../App.css';

export default function Couponlist(props) {
  return (
    <div>
        {props.coupons.map(coupon => {
            return <Coupon props={coupon}></Coupon>
        })}
    </div>
  )
}
