const moment = require('moment');
const Appointment = require('../models/appointment.model');
const { scheduleApp } = require('./scheduleService');


async function updateAppointment(phoneNumber, updateData) {
    // Verificar si la hora está disponible
    const appointment = await Appointment.findOne({
        phone_number: phoneNumber,
    });


    if (!appointment) {

        throw new Error('404 cita no encontrada')
    }

        const { date, name, service, start_time, phone_number } = updateData
        const appointmentDateTime = moment(`${date} ${start_time}`, "DD/MM/YYYY HH:mm").toDate();


        //validando si se modifico la fecha o la hora

        const compareDates = moment(appointmentDateTime).isSame(appointment.date)
        if (!compareDates) {
            //aqui es donde va la logica si no son iguales
            // tengo que buscar si esa fecha esta disponible
            console.log("Entrando?", appointmentDateTime, date)
            const newAppointment = scheduleApp(date, name, service, start_time, phone_number)

            ///dejando la hora libre

            appointment.name = '';
            appointment.service = '';
            appointment.status = 'true'; // Asumiendo que 'true' significa Disponible
            appointment.phone_number = '';
            await appointment.save();


            return newAppointment ;
        }

        
        const updatedAppointment = await Appointment.updateOne(
            { phone_number: phoneNumber },
            { $set: updateData },
             { new: true } // Esto devuelve el documento modificado
        );

        return updatedAppointment;
    }

    





module.exports = { updateAppointment };
