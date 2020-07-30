import Sequelize from 'sequelize';
import database from '../../config/database.js';

// Import Models
import TripModel from './trip.js';
import RiderModel from './rider.js';
import DriverModel from './driver.js';
import pickupLocationModel from './pickupLocation.js';
import dropLocationModel from './dropLocation.js';

const { sequelize } = database();


export const Trip = TripModel(sequelize, Sequelize);
export const Rider = RiderModel(sequelize, Sequelize);
export const Driver = DriverModel(sequelize, Sequelize);
export const pickupLocation = pickupLocationModel(sequelize, Sequelize);
export const dropLocation = dropLocationModel(sequelize, Sequelize);
