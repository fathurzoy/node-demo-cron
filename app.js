const express = require('express');
const app = express();
const axios = require('axios'); // for making HTTP requests
const cron = require('node-cron');
const Joi = require('@hapi/joi');
const movies = require('./movies');
// Define a function to make the API request
const fetchDataFromLocalAPI = async () => {
    try {
        // Make a GET request to your local API endpoint
        const response = await axios.get('https://cron-kcic-ebc9cb106945.herokuapp.com/abc/api/cron');
        console.log('API Response:', response.data);
        // You can process the response data here as needed
    } catch (error) {
        console.error('Error:', error);
    }
};

// Schedule the cron job to run every minute (adjust the schedule as needed)
cron.schedule('* * * * *', () => {
    fetchDataFromLocalAPI();
});


app.use(express.json());

app.use('/abc', movies);


app.get('/', (req,res) => {
    res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
})










const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));