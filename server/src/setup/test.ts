const min = 10;
const max = 40;
const volatility = 20;
let value =  200 + Math.random() * 200;

const stocks = [value];

for (let i = 0; i < 100; i++) {
  let mod = 0.5;
  if (value > max) mod = 0.8;
  if (value < min) mod = 0.2;
  const dir = (Math.random() >= mod) ? 1 : -1;

  // maxToAdd = max amount that the value can change
  const maxToAdd = (max - min) * volatility / 100;
  value += (Math.random() * maxToAdd * dir);

  // value can't be 0 -- random number from 0 to 10
  if (value < 0) this.value = Math.random() * 10;

  // rounds to 2 decimal places
  value = (Math.round(100 * value)) / 100;
  stocks.push(value);
}
