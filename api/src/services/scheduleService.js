const moment = require('moment');
const Appointment = require('../models/appointment.model');
// const axios = require('axios')


async function scheduleApp(date, name, service, start_time, phone_number) {


    // Convertir la fecha y hora de inicio a un objeto Date
    const appointmentDateTime = moment(`${date} ${start_time}`, "DD/MM/YYYY HH:mm").toDate();

    // Verificar si la hora está disponible
    const existingAppointment = await Appointment.findOne({
        date: appointmentDateTime,
        status: 'true'
    });
    if (!existingAppointment) {


        const isBusy = true
        return { isBusy }
    }

    // console.log(phone_number, start_time)
    // Actualizar la cita con los detalles proporcionados
    existingAppointment.name = name;
    existingAppointment.service = service;
    existingAppointment.status = 'false'; // Asumiendo que 'false' significa ocupado
    existingAppointment.phone_number = phone_number;
    await existingAppointment.save();

    return { isBusy: false }



}

module.exports = { scheduleApp };