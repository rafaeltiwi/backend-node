// src/services/addAvailabilityService.js
const moment = require('moment');
const Appointment = require('../models/appointment.model');

async function Addavailability(date, startTime, endTime, interval) {
    let currentTime = moment(date + ' ' + startTime, 'DD/MM/YYYY HH:mm');

    const endTimeMoment = moment(date + ' ' + endTime, 'DD/MM/YYYY HH:mm');
    const availability = [];

    while (currentTime.isBefore(endTimeMoment)) {
        availability.push({
            date: moment(currentTime.toDate(), 'DD/MM/YYYY HH:mm'),
            status: "true"
        });
        currentTime.add(interval, 'hours');
    }

    await Appointment.insertMany(availability);
    // console.log(availability)
    return availability;
}

module.exports = { Addavailability };