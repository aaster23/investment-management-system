import { Watchlist } from './../data/entities/watchlist.entity';
import { User } from './../data/entities/user.entity';
import { Funds } from './../data/entities/funds.entity';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Role } from '../data/entities/role.entity';
import { Status } from '../data/entities/status.entity';
import { Company } from '../data/entities/company.entity';
import { Industry } from '../data/entities/industry.entity';
import { watch } from 'fs';

createConnection().then(async (conn) => {

  // Setup user roles
  const roleRepo = conn.getRepository<Role>(Role);

  try {
    const roleAdmin = new Role();
    roleAdmin.rolename = 'admin';
    await roleRepo.save(roleAdmin);

    const roleManager = new Role();
    roleManager.rolename = 'manager';
    await roleRepo.save(roleManager);

    const roleclient = new Role();
    roleclient.rolename = 'client';
    await roleRepo.save(roleclient);

    console.log(`User roles written successfully.`);
  } catch (e) {
    console.warn('Skipping user roles...');
  }

 // Setup mock-up industries

  const industryRepo = conn.getRepository<Industry>(Industry);
  try {
    const industry1 = new Industry();
    industry1.name = 'Test Industry #1';
    await industryRepo.save(industry1);

    const industry2 = new Industry();
    industry2.name = 'Test Industry #2';
    await industryRepo.save(industry2);
    console.log(`Test industries written`);
  } catch (e) {
    console.warn('Skipping test industries...');
  }

  // Setup mock-up companies
  const companyRepo = conn.getRepository<Company>(Company);

  try {
    const industries = await industryRepo.find({});
    const firstIndustry = industries[0];

    const company1 = new Company();
    company1.name = 'Test Market #1';
    company1.industry = firstIndustry;
    company1.abbr = 'AAA';
    company1.address = 'Test Address #1';
    company1.ceo = 'Test CEO #1';
    company1.icon = '__MISSING__';
    company1.closedate = new Date(2000, 0, 0, 12, 0);
    // market1.watchlists = Promise.resolve([]);
    // market1.orders = Promise.resolve([]);
    // market1.stocks = Promise.resolve([]);
    await companyRepo.save(company1);

    const company2 = new Company();
    company2.name = 'Test Market #2';
    company2.industry = firstIndustry;
    company2.abbr = 'DD';
    company2.address = 'Test Address #2';
    company2.ceo = 'Test CEO #2';
    company2.icon = '__MISSING__';
    company2.closedate = new Date(2000, 0, 0, 8, 0);
    // market2.watchlists = Promise.resolve([]);
    // market2.orders = Promise.resolve([]);
    // market2.stocks = Promise.resolve([]);
    await companyRepo.save(company2);

    const company3 = new Company();
    company3.name = 'Test Market #3';
    company3.industry = firstIndustry;
    company3.abbr = 'DDBD';
    company3.address = 'Test Address #3';
    company3.ceo = 'Test CEO #3';
    company3.icon = '__MISSING :) __';
    company3.closedate = new Date(2001, 0, 0, 8, 0);
    // market2.watchlists = Promise.resolve([]);
    // market2.orders = Promise.resolve([]);
    // market2.stocks = Promise.resolve([]);
    await companyRepo.save(company3);
    console.log(`Test markets written`);
  } catch (e) {
    console.log(e);
    console.warn('Skipping test markets...');
  }

  // Setup orders funds
  const fundsRepo = conn.getRepository<Funds>(Funds);

  try {
    const fund1 = new Funds();
    fund1.currentamount = 1000;
    await fundsRepo.save(fund1);

    const fund2 = new Funds();
    fund2.currentamount = 500;
    await fundsRepo.save(fund2);

    console.log(`Funds table written successfully.`);
  } catch (e) {
    console.warn('Skipping adding funds...');
  }

  // Setup mock-up users

  const usersRepo = conn.getRepository<User>(User);
  try {
    const roles = await roleRepo.find({});
    const roleManager = roles[2];
    const roleClient = roles[1];

    const funds = await fundsRepo.find({});
    const funds1 = funds[0];
    const funds2 = funds[1];

    const user1 = new User();
    user1.dateregistered = new Date();
    user1.email = 'manager@gmail.com';
    user1.fullname = 'Manager1';
    user1.password = 'root';
    user1.role = roleManager;

    const user2 = new User();
    user2.dateregistered = new Date();
    user2.email = 'client@gmail.com';
    user2.fullname = 'Client1';
    user2.password = 'root';
    user2.role = roleClient;
    user2.manager = user1;
    user2.funds = funds2;

    user1.clients = Promise.resolve([user2]);

    await usersRepo.save(user1);

    await usersRepo.save(user2);

    console.log(`Test users written`);
  } catch (e) {
    console.log(e);
    console.warn('Skipping test users...');
  }
  // Setup mock-up watchlist
  const watchlistRepo = conn.getRepository<Watchlist>(Watchlist);

  try {

    const users = await usersRepo.find({});
    const client1 = users[0];

    const companies = await companyRepo.find({});
    const company1 = companies[0];
    const company2 = companies[1];

    const watchlist = new Watchlist();
    watchlist.client = Promise.resolve(client1);
    watchlist.companies = [company1, company2];
    await watchlistRepo.save(watchlist);
    console.log(`Test watchlist written`);
  } catch (e) {
    console.log(e);
    console.warn('Skipping test watchlist...');
  }

  conn.close();
});