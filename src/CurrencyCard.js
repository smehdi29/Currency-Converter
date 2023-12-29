import React from 'react'

export default function CurrencyCard(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
    <div className='card'>
        <input type = "number" value = {amount} onChange = {onChangeAmount} />
        <select value = {selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
                <option key = {option} value = {option}>
                {option}
                </option>
            ))}
        </select>
    </div>
  )
}
