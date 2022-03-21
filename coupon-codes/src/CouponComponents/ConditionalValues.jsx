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
         <div>Discount percentage: <input type="text" onChange={discountHandler}/></div>
         <div>Maximum discount amount availed: <input type="text" onChange={maxdiscountHandler}/></div>
     </div>
 }else{
    return <div>
         <div>Discount amount: <input type="text" onChange={amountHandler}/></div>
     </div> 
 }
}
