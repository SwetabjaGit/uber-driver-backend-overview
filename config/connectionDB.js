import Sequelize from 'sequelize';
import { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } from 'babel-dotenv';

let database = null;

export default function () {
  if (!database) {
    const sequelize = new Sequelize(
      DB_NAME,
      DB_USER,
      DB_PASS,
      { 
        host: DB_HOST,
        dialect: DB_DIALECT
      }
    );
    
    database = { sequelize };

    sequelize.sync().done(() => {
      return database;
    });  
  }
  return database;
}