import React from 'react'
import { useState } from 'react'
import ConditionalValues from './ConditionalValues'
import '../App.css';

export default function Newcoupon(props) {
  const [type, setType] = useState('variable');
  const [minamount, setMinamount] = useState();
  const [discount, setDiscount] = useState();
  const [maxdiscount, setMaxDiscount] = useState();
  const [amount, setAmount] = useState();
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [message,setMessage] = useState();
  const typeChangeHandler = (e)=>{
    setType(e.target.value);
  }
  const minamountHandler = (e)=>{
    setMinamount(e.target.value);
  }
  const startdateHandler = (e)=>{
    setStartDate(e.target.value);
  }
  const enddateHandler = (e)=>{
    setEndDate(e.target.value);
  }

  const amountHandler = (value)=>{
    setAmount(value);
  }

  const discountHandler = (value)=>{
    setDiscount(value);
  }

  const maxdiscountHandler = (value)=>{
    setMaxDiscount(value);
  }

  const createHandler = ()=>{
    if (!validate()){
      setMessage('please enter correct values!!')
      return
    }
    setMessage('')
    const data = {
            amount: amount,
            discount: discount,
            maxdiscount: maxdiscount,
            minamount: minamount,
            startdate: startdate,
            enddate: enddate
          }
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
    }
    const url = 'http://localhost:4000/api/coupons';
    fetch(url, options).then(resp=>{console.log('Data sent');})
    props.addcoupon();

    }

const validate = ()=>{
  if (isNaN(minamount)){
    return false;
  }
  if (isNaN(amount) && isNaN(discount) && isNaN(maxdiscount)){
    return false;
  }
  if ((isNaN(discount) && !isNaN(maxdiscount)) || (!isNaN(discount) && isNaN(maxdiscount))){
    return false;
  }
  if(startdate == null || enddate == null){
    return false;
  }
  return true;
}

  return (
    <div>
        <div>Minimum amount needed for coupon: <input type="text" onChange={minamountHandler}/></div>
        <div>
          <select id='coupon-type' on onChange={typeChangeHandler}>
              <option value="variable" selected>Percentage Discount</option>
              <option value="fixed">Fixed Discount</option>
            </select>
        </div>
        <div>
          <ConditionalValues type = {type} setAmount = {amountHandler} setDiscount = {discountHandler} setMaxDiscount = {maxdiscountHandler}></ConditionalValues>
        </div>
        <div>
          From <input type="date" onChange={startdateHandler}/> to <input type="date" onChange={enddateHandler}/>
        </div>
        <button onClick={createHandler}>Create</button>
        <div>
          <span>{message}</span>
        </div>
    </div>
  )
}
