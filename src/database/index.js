import Sequelize from 'sequelize';
import User from '../app/models/User';
import Recepient from '../app/models/Recepient';
import databaseConfigs from '../config/database';

const models = [User, Recepient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfigs);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
