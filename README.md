# Travel App Project
- This is the final project for the Udacity front end nanodegree program.
- This project is a simple web app that includes a form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast.
- The project also pulls some extra information about the user's destination's country e.g population, currency and primary language

## How to run the project
1- Download the dependencies with: npm i or npm install
2- After the dependencies are downloaded type: npm run build-prod
3- After the build is complete run the app: npm start
4- The app will be running on localhost: 8780

## Testing
Testing is done with Jest. To run test, use the command:  npm run test

## Api used
- Geonames - This was used to get the longitude, latitude, country code and country name.
- Weatherbit - This is used to get weather details using the longitude and latitude gotten from Geonames API.
- Pixabay - This is used to get an image of the destination city.
- REST Countries - This is used to get information about the country.
