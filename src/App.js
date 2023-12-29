import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyCard from './CurrencyCard';

const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_LWjhyAPNWX7yXGlT1lkitoOUHCIzdEyH6AmhImY8';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const[fromCurr, setFromCurr] = useState();
  const[toCurr, setToCurr] = useState();
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  
 // console.log(currencyOptions)
 let toAmount, fromAmount
 if(amountInFromCurrency){
  fromAmount = amount
  toAmount = amount*exchangeRate
 }else{
  toAmount = amount
  fromAmount = amount/exchangeRate
 }

  useEffect(() =>{
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.data)[31]
        const secondCurrency = Object.keys(data.data)[0]
        setCurrencyOptions([...Object.keys(data.data)])
        setFromCurr(firstCurrency)
        setToCurr(secondCurrency)
        setExchangeRate(data.data[secondCurrency])
      })
  }, [])

  useEffect(() =>{
    if(fromCurr != null && toCurr != null){
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => setExchangeRate(data.data[toCurr]/data.data[fromCurr]))
    }
  }, [fromCurr, toCurr])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <>
    <h1>Convert your Currency</h1>
    <CurrencyCard
      currencyOptions = {currencyOptions}
      selectedCurrency = {fromCurr}
      onChangeCurrency = {e => setFromCurr(e.target.value)}
      onChangeAmount = {handleFromAmountChange}
      amount = {fromAmount}
    />
    <div className='equals'>=</div>
    <CurrencyCard
      currencyOptions = {currencyOptions}
      selectedCurrency = {toCurr}
      onChangeCurrency = {e => setToCurr(e.target.value)}
      onChangeAmount = {handleToAmountChange}
      amount = {toAmount}
    />
    </>
  );
}

export default App;
