import trip from '../app/routes/trip.routes.js';
// import wsTracking from '../app/driver.ws';

const init = (app) => {
  app.use('/api/v1/trips', trip);
  // wsTracking(app);
}

export default { init };
