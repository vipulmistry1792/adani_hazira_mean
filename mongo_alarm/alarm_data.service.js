const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Alarm_data = db.Alarm_data;

module.exports = {
    getAll,
    getAll_new,
    create
};

async function getAll() {
    return await Alarm_data.find();
}
async function getAll_new() {
    return await db.Alarm_data.find().sort({ $natural: -1 }).limit(150)
}
async function getById(id) {
    return await Alarm_data.findById(id);
}
async function create(dataParam) {
    // // validate
    // if (await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }
   // console.log(dataParam);
    const mqtt_data = new Alarm_data(dataParam);

    // // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await mqtt_data.save();
}


async function _delete(id) {
    await Alarm_data.findByIdAndRemove(id);
}
