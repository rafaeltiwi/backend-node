const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model');
const moment = require('moment')

router.get('/', async (req, res) => {

    const startOfDay = moment(req.body.date, "DD/MM/YYYY").startOf('day');
    const endOfDay = moment(req.body.date, "DD/MM/YYYY").endOf('day');





    try {
        const appointments = await Appointment.find({
            date:  { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
        });
res.status(200).json(appointments);
    } catch (error) {
    res.status(500).send("Error al obtener las citas: " + error.message);
}
});

module.exports = router;