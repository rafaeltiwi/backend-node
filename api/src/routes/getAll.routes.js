const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model');

router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).send("Error al obtener las citas: " + error.message);
    }
});

module.exports = router;