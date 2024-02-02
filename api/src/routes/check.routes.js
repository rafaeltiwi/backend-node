// routes/checkAvailability.js
const express = require('express');
const router = express.Router();
const {checkAvailability} = require('../services/checkService')

router.post('/', async (req, res) => {
    const dates = req.body; // Asumiendo que el cuerpo de la solicitud es un array de fechas

    try {

        const availability = await checkAvailability(dates)

        res.json(availability);
    } catch (error) {
        res.status(500).send(error.toString());
        console.log(error)
    }
});

module.exports = router;