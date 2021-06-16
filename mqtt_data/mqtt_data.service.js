const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Mqtt_data = db.Mqtt_data;

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete
};

async function getAll() {
    return await Mqtt_data.find();
}

async function getById(id) {
    return await Mqtt_data.findById(id);
}
async function create(dataParam) {
    // // validate
    // if (await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }
    console.log(JSON.parse(dataParam));
    const mqtt_data = new Mqtt_data(dataParam);

    // // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await mqtt_data.save();
}


async function _delete(id) {
    await Mqtt_data.findByIdAndRemove(id);
}
