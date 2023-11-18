const express = require('express');
const cors = require('cors');
const { constants } = require('./env');
const bookingsRouter = require('./routes/bookings');

const app = express();
app.use(express.json());
app.use(cors('*'));
app.use('/api/bookings', bookingsRouter);

app.listen(constants.SERVER_PORT, '0.0.0.0', () => {
    console.log("server started at "+constants.SERVER_PORT+"...");
});