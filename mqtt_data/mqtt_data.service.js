const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Mqtt_data = db.Mqtt_data;
module.exports = {
    getAll,
    getAll_new,
    create,
    filter
};
async function getAll() {
    return await Mqtt_data.find();
}
async function getAll_new() {
    return await db.Mqtt_data.find().sort({ $natural: -1 }).limit(150)
}
async function getById(id) {
    return await Mqtt_data.findById(id);
}
async function create(dataParam) {
    const mqtt_data = new Mqtt_data(dataParam);
    await mqtt_data.save();
}
async function filter(tag){
    console.log(tag)
    return await db.Mqtt_data.find({ created: { $gte: new Date(tag.fromDate),$lte: new Date(tag.toDate) } })
  }
async function _delete(id) {
    await Mqtt_data.findByIdAndRemove(id);
}
