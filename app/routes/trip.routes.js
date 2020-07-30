import express from 'express';
import helper from '../helper.js';
import ctrl from '../controllers/trip.controller.js';

const router = new express.Router();

router.get('/trips', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getAllTrips(req, res);
}));

router.get('/riders', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getAllRiders(req, res);
}));

router.get('/drivers', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getAllDrivers(req, res);
}));

router.post('/ride-now', helper.asyncMiddleware(async (req, res) => {
  await ctrl.rideNow(req, res);
}));

router.post('/go-online', helper.asyncMiddleware(async (req, res) => {
  await ctrl.goOnline(req, res);
}));

router.post('/go-offline', helper.asyncMiddleware(async (req, res) => {
  await ctrl.goOffline(req, res);
}));

router.post('/reject-trip', helper.asyncMiddleware(async (req, res) => {
  await ctrl.rejectTrip(req, res);
}));

router.post('/accept-trip', helper.asyncMiddleware(async (req, res) => {
  await ctrl.acceptTrip(req, res);
}));

router.get('/navigate-to-rider', helper.asyncMiddleware(async (req, res) => {
  await ctrl.navigateToRider(req, res);
}));

router.post('/start-trip', helper.asyncMiddleware(async (req, res) => {
  await ctrl.startTrip(req, res);
}));

router.post('/collect-cash', helper.asyncMiddleware(async (req, res) => {
  await ctrl.collectCash(req, res);
}));

router.post('/complete-trip', helper.asyncMiddleware(async (req, res) => {
  await ctrl.completeTrip(req, res);
}));

router.post('/rate-rider', helper.asyncMiddleware(async (req, res) => {
  await ctrl.rateRider(req, res);
}));

export default router;
