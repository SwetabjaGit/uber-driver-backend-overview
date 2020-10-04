# Uber Driver System

Simple Backend Implementation of Uber Like Driver API in Nodejs and Mysql using Sequelize ORM.
Most of these Endpints are hit from the Driver App.


## API Endpoints

`/trips` - Get all Trips   
`/riders` - Get all Riders   

`/drivers` - Get all Drivers

`/ride-now` - Customer begins search for cabs

`/go-online` - Driver starts appearing in Discovery Radius of Rider

`/go-offline` - Driver is no longer visible in Discovery Radius

`/reject-trip` - Driver Rejects Incomming Ride Request

`/accept-trip` - Driver Accepts Incomming Ride Request

`/navigate-to-rider` - App calculates an optimal path to navigate to Rider

`/start-trip` - Calculate optimal path to Destination and Start the Trip

`/collect-cash` - Indicate the app when cash is collected from rider

`/complete-trip` - Change the status of the trip to completed

`/rate-rider` - Rate the Rider on a scale of 1 - 5


## Execute commands:

`npm install` - Install dependencies

`npx sequelize db:migrate` - Just to run the migrations

`npm run dev` - Start dev server and run the migrations

`npm run test-integration` - Run test's
