import React from 'react'
import '../App.css';

export default function ConditionalValues(props) {

  const amountHandler = (e)=>{
    props.setAmount(e.target.value)
    console.log(e.target.value);
  }

  const discountHandler = (e)=>{
    props.setDiscount(e.target.value);
    console.log(e.target.value);
  }

  const maxdiscountHandler = (e)=>{
    props.setMaxDiscount(e.target.value);
  }
 const type = '' + props.type;
 console.log(type);
 if (type === 'variable'){
     return <div>
         <div>Discount percentage: <input type="text" onChange={discountHandler} value={props.discount}/></div>
         <div>Maximum discount amount availed: <input type="text" onChange={maxdiscountHandler} value={props.maxdiscount}/></div>
     </div>
 }else{
    return <div>
         <div>Discount amount: <input type="text" onChange={amountHandler} value={props.amount}/></div>
     </div> 
 }
}
