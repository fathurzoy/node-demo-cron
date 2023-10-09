const express = require('express');
const app = express();
const axios = require('axios'); // for making HTTP requests
const cron = require('node-cron');
const moment = require('moment-timezone');
const Joi = require('@hapi/joi');
const movies = require('./movies');

const getCurrentDateTimeInJakartaTimezone = () => {
    const jakartaTimezone = 'Asia/Jakarta';
    const nowInJakarta = moment().tz(jakartaTimezone);
    return nowInJakarta.format('YYYY-MM-DD HH:mm:ss');
};

// Define a function to make the API request
const fetchDataFromLocalAPI = async () => {
    const currentDateTimeInJakarta = getCurrentDateTimeInJakartaTimezone();

    // Check if the current hour is between 22 (10 PM) and 2 (2 AM)
    const currentHourInJakarta = moment().tz('Asia/Jakarta').hour();

    // Check if the current hour is between 22 (10 PM) and 2 (2 AM)
    if (currentHourInJakarta >= 22 || currentHourInJakarta < 2) {
        try {
            // Make a GET request to your local API endpoint
            const response = await axios.get('https://cron-kcic-ebc9cb106945.herokuapp.com/abc/api/cron');
            console.log('API Response:', response.data);
            // You can process the response data here as needed
        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log('Current Date and Time in Jakarta:', currentDateTimeInJakarta);
        }
    }
    // else {
    //     console.log('Current time is not within the specified range.');
    // }
};

// Schedule the cron job to run every minute (adjust the schedule as needed)
cron.schedule('* * * * *', () => {
    fetchDataFromLocalAPI();
});

// const cronExpression = '0 22-2 * * *'; // Run between 10 PM and 2 AM
// cron.schedule(cronExpression, () => {
//   fetchDataFromLocalAPI();
// });


app.use(express.json());

app.use('/abc', movies);


app.get('/', (req, res) => {
    res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
})










const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));