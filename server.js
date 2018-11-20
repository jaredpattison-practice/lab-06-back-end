'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Setup 
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// API Route (only one now; we'll bbe adding more)

app.get('/location', (request, response) => {
  // We are not using this data, just logging it for proof of life.
  // Look in your terminal console to see where this cam through.
  console.log(request.query.data, 'is the query that cam from the search field in the browser.');
  // This is how we will send the actual query when we move to real data rather than mocked data
  const locationData = searchToLatLong(request.query.data);
  // Thsi is what gets sent back to the browser
  console.log(locationData);
  response.send(locationData);
});

// Helper Functions
function searchToLatLong(query) {
  // For now we are just loading a file of mock data; this will be changed to an API call in the demo in Lecture 7
  const geoData = require('./data/geo.json');
  // Look at the data file that is a mock of the results we will get back from Google when we do the geocoding search. We don't need all of that.
  // So, now pass the data through a constructor so that we cantidy it up:
  const location = new Location(geoData.results[0]);
  // Adding our actual searchquery back on and sending it backto the browser
  location.search_query = query;
  return location;
}

// This is the constructor we are usin to tidy up the data and send the browser only the information that it needs.
function Location(data) {
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

// Make sure the server is listening for the requests

app.listen(PORT, () => console.log(`App is up on ${PORT}`));
