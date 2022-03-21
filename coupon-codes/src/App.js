import logo from './logo.svg';
import './App.css';
import Couponlist from './CouponComponents/Couponlist';
import Newcoupon from './CouponComponents/Newcoupon';
import Home from './CouponComponents/Home';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Calculateamount from './CouponComponents/Calculateamount';
import { useState, useEffect } from 'react';

function App() {
  const [coupons, setCoupons] = useState([])
    const url = 'http://localhost:4000/api/coupons';
    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async ()=>{
        const resp = await fetch(url).then(resp => {
            return resp.json() || [];
        })
        setCoupons(resp.data);
    }
  return (
    <Router>
      <Home></Home>
      <Routes>
        <Route path="/coupons" element = {<Couponlist coupons = {coupons}></Couponlist>} exact></Route>
        <Route path="/create" element = {<Newcoupon addcoupon = {fetchCoupons}></Newcoupon>} exact></Route>
        <Route path="/getdiscount" element = {<Calculateamount coupons = {coupons}></Calculateamount>} exact></Route>
      </Routes>
    </Router>
  );
}

export default App;
