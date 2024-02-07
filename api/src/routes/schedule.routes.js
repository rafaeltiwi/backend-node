const express = require('express');
const router = express.Router();
const { scheduleApp } = require('../services/scheduleService')

router.post('/', async (req, res) => {
    try {
        const { date, name, service, start_time, userId } = req.body;

        if (!date || !name || !service || !start_time) {
            return res.status(400).send("Faltan datos necesarios para agendar la cita.");
        }


        const newAppointment = await scheduleApp(date, name, service, start_time, userId)

        if (newAppointment.isBusy) {
            return res.status(400).send("La hora seleccionada ya está ocupada.");

        }

        res.status(201).send(`La cita ha sido agendada correctamente el día ${date} a las ${start_time}.`);
    } catch (error) {

        res.status(500).send(error.toString());
    }
});

module.exports = router;