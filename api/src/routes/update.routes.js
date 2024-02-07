const express = require('express');
const router = express.Router();
const { updateAppointment } = require('../services/updateService')

router.patch('/phone/:phoneNumber', async (req, res) => {
    const { phoneNumber } = req.params;
    const updateData = req.body;

    try {
        /// aqui ir la logica de actualizar las citas
        const updatedAppointment = await updateAppointment(phoneNumber, updateData)

            
              
        if (!updatedAppointment.isBusy) {
            
            return res.status(201).send(`La cita ha sido actualizada correctamente el día ${updateData.date} a las ${updateData.start_time}.`);
        }
         res.status(400).send("La hora que se quiere actualizar seleccionada ya está ocupada.");

   

        //res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).send("Error al modificar la cita: " + error.message);
    }
});


module.exports = router;
