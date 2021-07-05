const express = require('express');
const router = express.Router();
const mqttdataService = require('./mqtt_data.service');

// routes
router.get('/', getAll);
router.get('/current', getCurrent);
router.post('/filter', getFilter);
module.exports = router;
function getAll(req, res, next) {
    mqttdataService.getAll()
        .then(mqttdata => res.json(mqttdata))
        .catch(err => next(err));
}
function getCurrent(req, res, next) {
    mqttdataService.getAll_new()
        .then(mqttdata => mqttdata ? res.json(mqttdata) : res.sendStatus(404))
        .catch(err => next(err));
}
function getFilter(req, res, next) {
   // console.log(req.body)
    mqttdataService.filter(req.body)
        .then(mqttdata => mqttdata ? res.json(mqttdata) : res.sendStatus(404))
        .catch(err => next(err));
}
