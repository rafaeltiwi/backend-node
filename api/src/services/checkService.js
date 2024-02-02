
const moment = require('moment');
const Appointment = require('../models/appointment.model');

async function checkAvailability(dates) {

    const availability = await Promise.all(dates.map(async (date) => {
        // Formatear la fecha para la consulta
        const startOfDay = moment(date, "DD/MM/YYYY").startOf('day');
        const endOfDay = moment(date, "DD/MM/YYYY").endOf('day');

        // Buscar disponibilidades para esta fecha
        const appointments = await Appointment.find({
            date: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() },
            status: "true" // Asumiendo que el estado "true" indica disponibilidad
        }).sort('date'); // Ordenar por fecha para tener las horas en orden

        
        // Extraer las horas de las citas disponibles
        const schedule = appointments.map(appointment => moment(appointment.date).format("HH:mm"));

       

        return {
            date,
            schedule
        };
    }));

    return availability
    
}

module.exports = { checkAvailability };