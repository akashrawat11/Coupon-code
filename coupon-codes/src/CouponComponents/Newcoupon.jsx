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
    if(e.target.value === 'variable'){
      setAmount("");
    }else{
      setDiscount("");
      setMaxDiscount("");
    }
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

  const createHandler = async ()=>{
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
    await fetch(url, options).then(resp=>{console.log('Data sent');})
    props.setCoupons();
    setMessage('Successfully Added!!')
    setToEmpty();
    }

    const setToEmpty = ()=>{
        setMinamount("");
        setAmount("");
        setDiscount("");
        setMaxDiscount("");
        console.log('called');
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
  if(!isNaN(discount) && discount > 100){
    return false;
  }
  if((!isNaN(maxdiscount) && maxdiscount > minamount) || (!isNaN(amount) && amount > minamount)){
    return false;
  }
  return true;
}

  return (
    <div>
        <div>Minimum amount needed for coupon: <input type="text" onChange={minamountHandler} value={minamount}/></div>
        <div>
          <select id='coupon-type' on onChange={typeChangeHandler}>
              <option value="variable" selected>Percentage Discount</option>
              <option value="fixed">Fixed Discount</option>
            </select>
        </div>
        <div>
          <ConditionalValues type = {type} setAmount = {amountHandler} setDiscount = {discountHandler} setMaxDiscount = {maxdiscountHandler} 
          discount={discount} maxdiscount={maxdiscount} amount={amount}></ConditionalValues>
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
