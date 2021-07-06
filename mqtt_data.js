var mqtt = require('mqtt'); //https://www.npmjs.com/package/mqtt
var Topic = '#'; //subscribe to all topics
var Broker_URL = 'mqtt:/localhost';
const mqtt_data      = require('./services/tags');
const mqttService = require('./mqtt_data/mqtt_data.service');
const alarmService = require('./mongo_alarm/alarm_data.service');
const alaram = require('./services/alarm');
const authid = process.env.Twilo_SID;
const auth_token= process.env.Twilo_Token;
const client_msg = require('twilio')('aaa', 'aaa');
var nodemailer = require('nodemailer');
var options = {
	clientId: 'MyMQTT',
	port: 1884,
	username: 'velox',
	password: 'Velox@123',	
	keepalive : 60
};

const insert_data      = async (mqtt_data1) => {
   //await mqtt_data.create(mqtt_data1);
   // await sleep(10);
}
const insert_dataalaram      = async (mqtt_data1) => {
    await alaram.create(mqtt_data1);
   // await sleep(10);
}
const insert_data1      = async (mqtt_data1) => {
	data_d=await mqtt_data.getMultiple_last10();
	data_d=data_d.data;
	//console.log(data_d[0].length)
	for (let index = 0; index < data_d[0]; index++) {
		const element = data_d[index];
		//console.log(element)
	}
    //await mqtt_data.create(mqtt_data1);
   // await sleep(10);
}
//mqtt connection paranaeter

var client  = mqtt.connect(Broker_URL, options);
//console.log(client);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);
function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
};

function mqtt_subscribe(err, granted) {
    console.log("Subscribed to " + Topic);
    if (err) {console.log(err);}
};

function mqtt_reconnect(err) {
    //console.log("Reconnect MQTT");
    //if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
};

function mqtt_error(err) {
    //console.log("Error!");
	//if (err) {console.log(err);}
};

function after_publish() {
	//do nothing
};

//receive a message from MQTT broker
function mqtt_messsageReceived(topic, message, packet) {
	var message_str = message.toString(); //convert byte array to string
	message_str = message_str.replace(/\n$/, ''); //remove new line
	var data = JSON.parse(message_str);
	data['created']=new Date();
	var responseJson = JSON.stringify(data.response);
	if(topic=="alarm")
	{
	//	insert_dataalaram(data);
		alarmService.create(data)
		.then(mqtt_data => mqtt_data ? console.log("success") : console.log({ message: 'Error Insert' }))
		.catch(err => console.log(err));
	}
	else
	{
		//send_message();
	//	console.log(data)
	if(data.t_50=='1.0')
	{
		//send_message();
	   //send_Email();
	}
		mqttService.getAll_new()
		.then(mydata=>{
			let my_s=mydata[1].toObject();
		//	console.log(my_s,data.t_50)
			if(my_s.t_50==data.t_50)
			{
				console.log("False")
			}
			else
			{
				if(data.t_50=='1.0')
				{
					console.log("True")
					send_message();
					send_Email();
					alert_call();					
				}
			}
		})
		.catch(err => console.log(err));
		insert_data(data);
		mqttService.create(data)
		.then(mqtt_data => mqtt_data ? console.log("success") : console.log({ message: 'Error Insert' }))
		.catch(err => console.log(err));
	}
};
//insert a row into the tbl_messages table
function insert_message(topic, message_str, packet) {
	var message_arr = extract_string(message_str); //split a string into an array
	var clientID= message_arr[0];
	var message = message_arr[1];
	mqttService.getAll_new()
	.then(mqtt_data=>{
	//	console.log(mqtt_data)
		if(mqtt_data.t50=message_arr[1].t50)
		{

		}
		else
		{
			if(message_arr[1].t50=="1")
			{
				console.log("true");
				send_message();
				send_Email();
				alert_call();
			}
		}
	})
	.catch(err => console.log(err));
        mqttService.create(message_str)
        .then(mqtt_data => mqtt_data ? console.log("success") : console.log({ message: 'Error Insert' }))
        .catch(err => console.log(err));
	
};
function mqtt_close() {
	//console.log("Close MQTT");
};
//split a string into an array of substrings
function extract_string(message_str) {
	var message_arr = message_str.split(","); //convert to array	
	return message_arr;
};	
//count number of delimiters in a string
var delimiter = ",";
function countInstances(message_str) {
	//console.log(message_str);
	var substrings = message_str.split(delimiter);
	return substrings.length - 1;
};
function send_message()
{
 client_msg.messages
  .create({
     body: 'Twin is Down',
     from: '+15204576457',
	 //to:'+91'
    to: '+919099005008'
   })
  .then(message => console.log(message.sid));
}
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'veloxiot20@gmail.com',
	  pass: 'Velox%123'
	}
  });
  var mailOptions = {
	from: 'veloxiot20@gmail.com',
//	to: 'vipulmistry92@gmail.com',
	to: 'ashish.mehta@adani.com',
	cc: 'vipulmistry92@gmail.com',
	subject: 'Crane Monitoring System',
	text: 'Twin is Down!'
  };
function send_Email()
{
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
}
function alert_call()
{
    client_msg.calls
    .create({
       method: 'GET',
       url: 'http://demo.twilio.com/docs/voice.xml',
       to: '+919099005008',
       from: '+15204576457'
     })
    .then(call => console.log(call));
}
