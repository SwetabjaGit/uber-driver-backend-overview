import Sequelize from 'sequelize';
import databaseConfig from './databaseConfig.js';

// Import Models
import TripModel from '../app/models/trip.js';
import RiderModel from '../app/models/rider.js';
import DriverModel from '../app/models/driver.js';
import pickupLocationModel from '../app/models/pickupLocation.js';
import dropLocationModel from '../app/models/dropLocation.js';



const {
  username,
  password,
  database,
  host,
  dialect
} = databaseConfig['development'];

let databaseCnn = null;

const connectToDatabase = () => {

  if (!databaseCnn) {
    //const sequelize = new Sequelize(`mysql://${username}@${host}:3306/${database}`);
    const sequelize = new Sequelize(
      database,
      username,
      password,
      {
        host: host,
        dialect: dialect,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );

    /* const Trips = TripModel(sequelize, Sequelize);
    const Rider = RiderModel(sequelize, Sequelize);
    const Driver =DriverModel(sequelize, Sequelize);
    const pickupLocation = pickupLocationModel(sequelize, Sequelize);
    const dropLocation = dropLocationModel(sequelize, Sequelize); */

    databaseCnn = { sequelize };

    //sequelize.sync({ force: true });
  }
  return databaseCnn;
};

export default connectToDatabase;





