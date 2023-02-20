import 'mocha';
// import { expect } from 'chai';
import { getRepository, Connection, Repository } from 'typeorm';

import { dbCreateConnection } from 'orm/dbCreateConnection';
import { User } from 'orm/entities/users/User';
describe('Users', () => {
  let dbConnection: Connection;
  let userRepository: Repository<User>;
  const standardUser = new User();
  standardUser.email = 'todd.alquist@test.com';
  standardUser.password = 'pass1';
  standardUser.hashPassword();

  before(async () => {
    dbConnection = await dbCreateConnection();
    userRepository = getRepository(User);
  });

  afterEach(async () => {
    await userRepository.delete([standardUser.id]);
  });
});
