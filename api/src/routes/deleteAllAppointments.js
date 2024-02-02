const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model');

router.delete('/', async (req, res) => {
    try {
        await Appointment.deleteMany({}); // Esto borrará todos los documentos de la colección
        res.status(200).send("Todos los datos han sido borrados.");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;