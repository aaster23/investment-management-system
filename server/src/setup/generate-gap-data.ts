import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SETUP } from './settings';
import { Company } from '../data/entities/company.entity';
import { Price } from '../data/entities/prices.entity';

const generateData = (loops: number, value?: number): number[] => {
  const min = 10;
  const max = 500;
  const volatility = 1.0 + Math.random() * 1.5;
  value = value || 200 + Math.random() * 200;

  const stocks = [value];

  for (let i = 0; i < loops; i++) {
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

  return stocks;

};

createConnection().then(async (conn) => {

  const companyRepo = conn.getRepository<Company>(Company);
  const priceRepo = conn.getRepository<Price>(Price);

  const companies = await companyRepo.find({});

  for (const company of companies) {
    try {
      // Find the most recent record
      const options = { where: { company }, order: { opendate: 'DESC' } };
      const price = await priceRepo.findOne({ where: { company }, order: { opendate: 'DESC' } });

      // Setup the start date for the update to the most recent record if any, else the initial start date
      let startdate = SETUP.startdate;
      if (price) {
        startdate = price.opendate;
      }

      // Calculate the number of records of fake data needed to bring the mock to the current date
      const now = new Date();
      const loops = Math.floor((now.valueOf() - startdate.valueOf()) / (1000 * SETUP.tick));

      const prices: Price[] = [];

      if (loops) {
        // Generate fake data
        const stockMockData = generateData(loops, price ? price.endprice : undefined);
        for (let i = 0; i < stockMockData.length - 1; i++) {
          const newPrice = new Price();
          newPrice.opendate = new Date(startdate.valueOf() + (i + 1) * SETUP.tick * 1000);
          newPrice.startprice = stockMockData[i];
          newPrice.endprice = stockMockData[i + 1];
          const delta = Math.abs(stockMockData[i + 1] - stockMockData[i]);
          const min = Math.min(stockMockData[i], stockMockData[i + 1]);
          const highlow = [min + Math.random() * delta, min + Math.random() * delta];
          newPrice.lowprice = +Math.min(...highlow).toFixed(2);
          newPrice.highprice = +Math.max(...highlow).toFixed(2);
          newPrice.company = Promise.resolve(company);
          prices.push(newPrice);
        }
        // Try to update the stocks
        try {
          await priceRepo.save(prices);
          console.log(`Update market data for ${company.name} with ${loops} records created from ${startdate.toDateString()}`);
        } catch (e) {
          console.warn(e);
        }
      } else {

        console.log(`Market data for ${company.name} is up to date.`);
      }

    } catch (error) {
      console.log(`oopsie... market update failed, reason: ${error.message}`);
    }
  }

  conn.close();

});
