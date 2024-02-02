const express = require('express')

const checkAvailabilityRouter = require('../routes/check.routes')
const deleteAllAppointmentsRouter = require('../routes/deleteAllAppointments');
const listAvailibility = require('../routes/availibility.routes');
const scheduleApp = require('../routes/schedule.routes');
const getAll = require('../routes/getAll.routes')
const updateApp = require('../routes/update.routes')


 function routes(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/appointments', getAll);

    router.use('/update', updateApp)

    router.use('/list_availibility', listAvailibility);

    router.use('/schedule_appointment', scheduleApp);


    router.use('/check_availability', checkAvailabilityRouter);


    //formatear los datos de la base de datos OJO!!! borrar cuando se mande a produccion
    router.use('/delete_all_appointments', deleteAllAppointmentsRouter);

}

module.exports = routes;


