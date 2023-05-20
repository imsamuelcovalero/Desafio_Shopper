// Quando usar o docker se der erro tem que mudar o nome do serviço em "host", neste caso é "db".

import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: process.env.MYSQL_DB || 'shopper_db',
  host: process.env.MYSQL_HOST || 'db',
  port: Number(process.env.MYSQL_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = config;