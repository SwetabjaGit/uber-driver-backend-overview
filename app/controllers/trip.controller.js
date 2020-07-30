import HttpStatus from 'http-status-codes';

import { Trip, Rider, Driver, pickupLocation, dropLocation } from '../models/index.js';
import ValidationContract from '../services/validator.js';
import trip from '../models/trip.js';

// There will be a collection named 'TRIPS', on hitting each of the endpoints, the status of the trips will be changed
// Get all trips
const getAllTrips = async (req, res) => {
  try {
    let allTrips = [];
    await Trip.findAll().then(trips => {
      allTrips = JSON.parse(JSON.stringify(trips, null, 4))
    });
    //console.log(allTrips);
    let tripsList = [];
    console.log(allTrips);
    for (let trip of allTrips) {
      let tripInfo = {};
      const {
        id, tripDate, driver, rider, tripStatus, pickupDistance, estimatedPickuptime, pickupLocation_id,
        dropLocation_id, dropDistance, estimatedDropTime, tripFare, fareCollected, createdAt, updatedAt 
      } = trip;
      tripInfo = trip;
      await Driver.findOne({ where: { userName: driver }}).then(data => {
        tripInfo['driver'] = JSON.parse(JSON.stringify(data, null, 4));
      });
      await Rider.findOne({ where: { userName: rider } }).then(data => {
        tripInfo['rider'] = JSON.parse(JSON.stringify(data, null, 4));
      });
      await pickupLocation.findOne({ where: { rider: rider } }).then(data => {
        tripInfo['pickupLocation'] = JSON.parse(JSON.stringify(data, null, 4));
      });
      await dropLocation.findOne({ where: { rider: rider } }).then(data => {
        tripInfo['dropLocation'] = JSON.parse(JSON.stringify(data, null, 4));
      });
      tripsList.push(tripInfo);
    }
    return res.status(200).send(tripsList);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Get all riders
const getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.findAll();
    return res.status(200).send(riders);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Get all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    return res.status(200).send(drivers);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// This will be initiated from Rider side
// New Trip will be created in 'TRIPS' collection with status 'Customer Requested'
const rideNow = async (req, res) => {
  try {
    const { email, userName } = req.body.rider;
    console.log(email);
    console.log(userName);
    let contract = new ValidationContract();

    // Check for valid email
    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }
    
    // Fetch Rider Details
    const riders = await Rider.findOne({ where: { userName: userName } });
    console.log(riders);
    if (!riders) return res.status(HttpStatus.CONFLICT).send({ message: 'Rider doesnt exist.' });

    //Fetch the pickup and drop location of the Rider
    let pickupSchema = await pickupLocation.findOne({ where: { rider: userName } });
    let dropSchema = await dropLocation.findOne({ where: { rider: userName } });
    if(pickupSchema == null || dropSchema == null){
      // Create new Pickup and Drop Locations
      await pickupLocation.create(req.body.pickupLocation);
      await dropLocation.create(req.body.dropLocation);
      pickupSchema = await pickupLocation.findOne({ where: { rider: userName } });
      dropSchema = await dropLocation.findOne({ where: { rider: userName } });
      //return res.status(400).send({ message: 'Pickup and Drop Locations are null.' });
    }

    // Create the Trip Payload
    let newTrip = {};
    newTrip = req.body;
    newTrip['tripDate'] = new Date();
    newTrip['rider'] = userName;
    newTrip['pickupLocation_id'] = pickupSchema.getDataValue('id');
    newTrip['dropLocation_id'] = dropSchema.getDataValue('id');
    newTrip['tripFare'] = generateTripFare();
    newTrip['fareCollected'] = false;
    const createdTrip = await Trip.create(newTrip);
    return res.status(200).send({ message: 'New Trip has been created.', data: createdTrip });
  } catch (error) {
    return res.status(HttpStatus.CONFLICT).send(error);
  }
};

const generateTripFare = () => {
  return Math.random() * (1000-100) + 100;
};

// App will return a list of nearest Trips to driver
const goOnline = async (req, res) => {
  try {
    // Get the Nearest Trips
    const nearestTrip = await getNearestTrips(req.body.rider, res);
    if (nearestTrip == null) return res.status(400).send({ message: 'No trips available right now.' });
    console.log(nearestTrip);

    // Check if the driver exists or not
    const { userName, email } = req.body.driver;
    const driverSchema = await Driver.findOne({ where: { userName: userName } });
    if (!driverSchema) return res.status(400).send({ message: 'Driver doesnt exist.' });
    nearestTrip['driver'] = JSON.parse(JSON.stringify(driverSchema, null, 4));
    
    //Update the driver in the Trip details
    Trip.update({ driver: userName }, { where: { id: nearestTrip.id } }).then(() => {
      console.log("Driver Details Updated");
    });
    return res.status(200).send(nearestTrip);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getNearestTrips = async (data, res) => {
  try {
    let nearTrip = {}; 
    await Trip.findOne({ where: { rider: data.userName } }).then(trips => {
      nearTrip = JSON.parse(JSON.stringify(trips, null, 4));
    });
    return nearTrip;
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Assign Trip['driver'] = NULL
const goOffline = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    const deleteTrip = await Trip.findOne({ where: { driver: userName } });
    if(!deleteTrip){
      return res.status(400).send({ message: 'No trips assigned to this driver yet.' });
    }
    console.log(deleteTrip);
    //await Trip.destroy({ where: { driver: req.body } });
    deleteTrip.setDataValue('driver', null);
    await deleteTrip.save();
    console.log(deleteTrip);

    return res.status(200).json({ message: 'Driver removed from this trip.' });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Status of the trip will be changed from 'Customer Requested' to 'Driver Rejected'
const rejectTrip = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    let contract = new ValidationContract();

    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }

    const tripDetails = await Trip.findOne({ where: { driver: userName } });
    if(!tripDetails){
      return res.status(400).send({ message: 'No trips assigned to this driver.' });
    }
    console.log(tripDetails);

    tripDetails.setDataValue('tripStatus', 'Driver Rejected');
    await tripDetails.save();

    return res.status(200).json({ message: 'Trip Rejected.' });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Status of the trip will be changed from 'Customer Requested' to 'Driver Accepted'
// Estimated Pickup Time and Distance will be calculated 
const acceptTrip = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    let contract = new ValidationContract();

    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }

    const tripDetails = await Trip.findOne({ where: { driver: userName } });
    if(!tripDetails){
      return res.status(400).send({ message: 'No trips assigned to this driver.' });
    }
    console.log(tripDetails);

    tripDetails.setDataValue('tripStatus', 'Driver Accepted');
    tripDetails.setDataValue('pickupDistance', calculatePickupDistance());
    tripDetails.setDataValue('estimatedPickupTime', calculatePickupTime());
    await tripDetails.save();

    return res.status(200).json({ message: 'Trip Accepted.' });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const calculatePickupDistance = () => {
  return Math.random() * (200-5) + 5;
};

const calculatePickupTime = () => {
  return Math.random() * (240-10) + 10;
};

// Google Maps will be opened and driver will be navigated to PICKUP Loaction
const navigateToRider = async (req, res) => {
  try {
  } catch (error) {
  }
};

// Status of the trip will be changed from 'Driver Accepted' to 'Trip Started'
// Estimated Drop Time and Distance will be calculated
const startTrip = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    let contract = new ValidationContract();

    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }

    const tripDetails = await Trip.findOne({ where: { driver: userName } });
    if(!tripDetails){
      return res.status(400).send({ message: 'No trips assigned to this driver.' });
    }

    tripDetails.setDataValue('tripStatus', 'Trip Started');
    tripDetails.setDataValue('dropDistance', calculateDropDistance());
    tripDetails.setDataValue('estimatedDropTime', calculateDropTime());
    await tripDetails.save();

    return res.status(200).json({ message: 'Trip Started.' });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const calculateDropDistance = () => {
  return Math.random() * (200-5) + 5;
};

const calculateDropTime = () => {
  return Math.random() * (240-10) + 10;
};

// 'fareCollected' field of the trip will be set to True
const collectCash = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    let contract = new ValidationContract();

    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }

    const tripDetails = await Trip.findOne({ where: { driver: userName } });
    if(!tripDetails){
      return res.status(400).send({ message: 'No trips assigned to this driver.' });
    }

    tripDetails.setDataValue('fareCollected', true);
    await tripDetails.save();

    return res.status(200).json({ message: 'Fare Collected' });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Status of the trip will be changed from 'Trip Started' to 'Trip Completed'
const completeTrip = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    let contract = new ValidationContract();

    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }

    const tripDetails = await Trip.findOne({ where: { driver: userName } });
    if(!tripDetails){
      return res.status(400).send({ message: 'No trips assigned to this driver.' });
    }

    tripDetails.setDataValue('tripStatus', 'Trip Completed');
    await tripDetails.save();

    return res.status(200).json({ message: 'Trip Completed' });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Rating of the Rider will be updated, on a scale of (1 to 5)
const rateRider = async (req, res) => {
  try {
    const { userName, email } = req.body.driver;
    const { rating } = req.body;
    let contract = new ValidationContract();

    contract.isEmail(email, 'This email is correct?');
    if (!contract.isValid()) {
      res.status(HttpStatus.CONFLICT).send(contract.errors()).end();
      return 0;
    }

    const tripDetails = await Trip.findOne({ where: { driver: userName } });
    if(!tripDetails){
      return res.status(400).send({ message: 'No trips assigned to this driver.' });
    }

    //Get the rider details
    const rider = await Rider.findOne({ where: { userName: tripDetails.getDataValue('rider') } });

    rider.setDataValue('rating', rating);
    await rider.save();

    return res.status(200).json({ message: `Rider Rated ${rating}` });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  getAllTrips,
  getAllRiders,
  getAllDrivers,
  rideNow,
  goOnline,
  goOffline,
  rejectTrip,
  acceptTrip,
  navigateToRider,
  startTrip,
  collectCash,
  completeTrip,
  rateRider
}