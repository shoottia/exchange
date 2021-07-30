const currencyEL_one = document.getElementById('currency-one');
const currencyEL_two = document.getElementById('currency-two');
const amountEL_one = document.getElementById('amount-one');
const amountEL_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//Fetch exchange rates and update the DOM
async function calculate(){
    const currency_one = currencyEL_one.value;
    const currency_two = currencyEL_two.value;
    
    const result = await fetch(` https://v6.exchangerate-api.com/v6/b4803047d104b7770da7858b/latest/${currency_one}`)
    const exchangeObj = await result.json();

    const rate = exchangeObj.conversion_rates[currency_two]; 
    
    rateEl.innerText = `1${currency_one} = ${rate} ${currency_two}`;
    amountEL_two.value = (amountEL_one.value * rate).toFixed(2);
}

currencyEL_one.addEventListener('change', calculate);
currencyEL_two.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
amountEL_two.addEventListener('input', calculate);

swap.addEventListener('click', () =>{
  const temp = currencyEL_one.value;
  currencyEL_one.value = currencyEL_two.value;
  currencyEL_two.value = temp;
  calculate();
});

calculate();