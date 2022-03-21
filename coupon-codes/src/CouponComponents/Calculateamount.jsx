import React from 'react'
import { useState } from 'react';
import '../App.css';

export default function (props) {
    const [cartValue, setCartValue] = useState();
    const [couponCode, setCouponCode] = useState();
    const [finalAmount, setFinalAmount] = useState(0);
    const [message, setMessage] = useState('');
    const amountValidator = ()=>{
        let amount = 0;
        if (!isNaN(cartValue)){
            amount = cartValue;
        }else{
            setMessage('Enter Correct amount!!')
            return
        }
        setFinalAmount(amount);
        console.log(props.coupons);
        props.coupons.forEach(element => {
            if (couponCode == element.id){
                const enddate = new Date(element.enddate);
                const startdate = new Date(element.startdate);
                const current = new Date();
                if(amount >= (+element.minamount) && current <= enddate && current >= startdate){
                    getFinalAmount(amount)
                    setMessage('')
                    return
                }
            }
        });
        setMessage('Enter Correct Code!!')
    }
    const getFinalAmount = async(amount)=>{
        const url = `http://localhost:4000/api/amount?price=${amount}&code=${''+couponCode}`;
        const resp = await fetch(url).then(resp=>{
           return resp.json()
        })
        setFinalAmount(resp.data)
    }
  return (
    <div>
        <div>Enter Total Cart Amount: <input type="text" onChange={e=>setCartValue(e.target.value)}/></div>
        <div>Enter Coupon Code: <input type="text" onChange={e=>setCouponCode(e.target.value)}/></div>
        <div><button onClick={amountValidator}>Checkout Amount</button></div>
        <div>Final Amount is <span>{finalAmount}</span></div>
        <span>{message}</span>
    </div>
  )
}
