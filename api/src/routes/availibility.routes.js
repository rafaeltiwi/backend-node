const express = require('express');
const router = express.Router();
const { Addavailability } = require('../services/availibilityService');


router.post('/', async (req, res) => {
    try {
        const { date, startTime,endTime, interval } = req.body;
        if (!date || !endTime ||!startTime || !interval) {
            return res.status(400).send("Faltan datos necesarios para agregar la disponibilidad.");
        }
  
       const availability = Addavailability( date, startTime,endTime, interval )
        
        res.status(201).json({ message: "Disponibilidad agregada" });
    } catch (error) {
        res.status(500).send(error);
       // console.log(error)
    }
  });

  module.exports = router;