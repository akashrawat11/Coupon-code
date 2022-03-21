const coupons = {
    data: [
    ]};

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(bodyparser.json());
app.use(cors())

app.listen(4000, function() {
  console.log('listening on 4000')
})

app.get('/api/coupons', (req, res)=>{
    res.send(coupons);
    res.end()
})

app.get('/api/amount', (req, res)=>{
    const amount = +req.query.price;
    const code = '' + req.query.code;
    let finalAmount = 0;
    coupons.data.forEach(item => {
        if(code === item.id){
            if(item.discount == null){
                finalAmount = amount - item.amount
            }else{
                finalAmount = amount - Math.min((amount * item.discount)/100, +item.maxdiscount)
            }
        }
    })
    res.send({"data": finalAmount})
    console.log(finalAmount);
    res.end()
})

app.post('/api/coupons', (req, res)=>{
    const item = req.body;
    item['id'] = getCode();
    coupons.data.push(item);
    addData(JSON.stringify(coupons.data));
    res.end();
})

const getCode = ()=>{
    let first = '';
    let middle = '';
    let last = '';
    const chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const length = chars.length-1
    for(let i = 0; i < 4; i++){
        first += chars.charAt(Math.floor(Math.random()*length))
        middle += chars.charAt(Math.floor(Math.random()*length))
        last += chars.charAt(Math.floor(Math.random()*length))
    }
    return first + '-' + middle + '-' + last;
}

const getData = ()=>{
    fs.readFile('coupons.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const existingCoupons = JSON.parse(data);
        existingCoupons.forEach(coupon => {
            coupons.data.push(coupon);
        });
    }
    });
}

const addData = (data)=>{
    fs.writeFile('coupons.json', data, 'utf8', (err) => {
    if (err) {
        console.log(`Error writing file: ${err}`);
    } else {
        console.log(`File is written successfully!`);
    }
});
}
getData();