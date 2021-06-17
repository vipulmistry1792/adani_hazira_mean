const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Mqtt_data = db.Mqtt_data;

module.exports = {
    getAll,
    getAll_new
};

async function getAll() {
    return await Mqtt_data.find();
}
async function getAll_new() {
    return await Mqtt_data.find().sort({ $natural: -1 }).limit(150);
}

