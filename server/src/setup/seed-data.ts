import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Role } from '../data/entities/role.entity';
import { Status } from '../data/entities/status.entity';
import { Company } from '../data/entities/company.entity';
import { Industry } from '../data/entities/industry.entity';
import { User } from '../data/entities/user.entity';
import * as bcrypt from 'bcrypt';

// tslint:disable:no-console

createConnection().then(async (conn) => {

  let admin, manager;

  // Setup user roles
  const roleRepo = conn.getRepository<Role>(Role);

  try {
    const roleAdmin = new Role();
    roleAdmin.rolename = 'admin';
    admin = await roleRepo.save(roleAdmin);

    const roleManager = new Role();
    roleManager.rolename = 'manager';
    manager = await roleRepo.save(roleManager);

    const roleClient = new Role();
    roleClient.rolename = 'client';
    await roleRepo.save(roleClient);

    const roleClosed = new Role();
    roleClosed.rolename = 'closed';
    await roleRepo.save(roleClosed);

    console.log(`User roles written successfully.`);
  } catch (e) {
    console.warn('Skipping user roles...');
  }

  // Setup the default admin
  // email: admin@test.com
  // password: azis123

  // Setup the default manager
  // email: manager@test.com
  // password: azis123

  const userRepo = conn.getRepository<User>(User);

  try {
    const user1 = new User();
    user1.fullname = 'Test Admin';
    user1.email = 'admin@test.com';
    user1.dateregistered = new Date();
    user1.role = admin;
    user1.password = await bcrypt.hash('azis', 10);

    await userRepo.save(user1);

    const user2 = new User();
    user2.fullname = 'Test Manager';
    user2.email = 'manager@test.com';
    user2.dateregistered = new Date();
    user2.role = manager;
    user2.password = await bcrypt.hash('azis', 10);

    await userRepo.save(user2);

    console.log(`Default admin and manager written successfully.`);
  } catch (e) {
    console.log(e);
    console.warn('Skipping admin creation...');
  }

  // Setup orders status
  const statusRepo = conn.getRepository<Status>(Status);

  try {
    const statusOpened = new Status();
    statusOpened.statusname = 'opened';
    await statusRepo.save(statusOpened);

    const statusClosed = new Status();
    statusClosed.statusname = 'closed';
    await statusRepo.save(statusClosed);

    console.log(`Status table written successfully.`);
  } catch (e) {
    console.warn('Skipping orders status...');
  }

  // Setup mock-up industries

  const industryRepo = conn.getRepository<Industry>(Industry);
  try {
    const industry1 = new Industry();
    industry1.name = 'Finances';
    await industryRepo.save(industry1);

    const industry2 = new Industry();
    industry2.name = 'Capital Goods';
    await industryRepo.save(industry2);

    const industry3 = new Industry();
    industry3.name = 'Industrial Goods';
    await industryRepo.save(industry3);

    const industry4 = new Industry();
    industry4.name = 'Transportation';
    await industryRepo.save(industry4);

    console.log(`Test industries written`);
  } catch (e) {
    console.warn('Skipping test industries...');
  }

  // Setup mock-up markets
  const companyRepo = conn.getRepository<Company>(Company);

  try {
    const industries = await industryRepo.find({});
    const firstIndustry = industries[2];

    const company1 = new Company();
    company1.name = 'Amazon';
    company1.industry = firstIndustry;
    company1.abbr = 'AMZN';
    company1.address = 'California, USA';
    company1.ceo = 'Jeff Bezos';
    company1.icon = '__MISSING__';
    company1.closedate = new Date(2000, 0, 0, 12, 0);
    await companyRepo.save(company1);

    const secondIndustry = industries[0];
    const company2 = new Company();
    company2.name = 'Bitcoin';
    company2.industry = secondIndustry;
    company2.abbr = 'BTC';
    company2.address = 'None';
    company2.ceo = 'Roger Ver';
    company2.icon = '__MISSING__';
    company2.closedate = new Date(2000, 0, 0, 8, 0);
    await companyRepo.save(company2);

    const company3 = new Company();
    company3.name = 'Ethereum';
    company3.industry = secondIndustry;
    company3.abbr = 'ETHEREUM';
    company3.address = 'None';
    company3.ceo = 'Vitalik Buterin';
    company3.icon = '__MISSING__';
    company3.closedate = new Date(2000, 0, 0, 6, 0);
    await companyRepo.save(company3);

    const fourthIndustry = industries[3];
    const company4 = new Company();
    company4.name = 'American Airlines Group';
    company4.industry = fourthIndustry;
    company4.abbr = 'AAL';
    company4.address = 'Texas, USA';
    company4.ceo = 'Dough Parker';
    company4.icon = '__MISSING__';
    company4.closedate = new Date(2000, 0, 0, 6, 0);
    await companyRepo.save(company4);

    console.log(`Test markets written`);
  } catch (e) {
    console.log(e);
    console.warn('Skipping test markets...');
  }

  conn.close();
});