// MQTT client details:
let broker = {
    host: "rabbitmq-mqtt-jx-staging.jenkinsx.globalintelligence.ro",
    port: 443,
    path: "/ws",
};
// MQTT client:
let client;
// client credentials:
let creds = {
    clientID: "p5Client",
    userName: "caviuser",
    password: "cavipassword",
};
// topic to subscribe to when you connect:
let topic = "lummetry/payloads";

function createClient() {
    client = new Paho.MQTT.Client(
        broker.host,
        Number(broker.port),
        broker.path,
        creds.clientID
    );
    // set callback handlers for the client:
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    // connect to the MQTT broker:
    client.connect({
        onSuccess: onConnect, // callback function for when you connect
        userName: creds.userName, // username
        password: creds.password, // password
        useSSL: true, // use SSL
        reconnect: true, // if connection fails, retry
    });

    // // create the send button:
    // sendButton = createButton("send a message");
    // sendButton.position(20, 20);
    // sendButton.mousePressed(sendMqttMessage);
}

// called when the client connects
function onConnect() {
    console.log("client is connected");
    client.subscribe(topic);
}

// called when the client loses its connection
function onConnectionLost(response) {
    if (response.errorCode !== 0) {
        console.log("onConnectionLost:" + response.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    data = message.payloadString;
}

// called when you want to send a message:
function sendMqttMessage() {
    // if the client is connected to the MQTT broker:
    if (client.isConnected()) {
        // make a string with a random number form 0 to 15:
        let msg = String(round(random(15)));
        // start an MQTT message:
        message = new Paho.MQTT.Message(msg);
        // choose the destination topic:
        message.destinationName = topic;
        // send it:
        client.send(message);
        // print what you sent:
        console.log("I sent: " + message.payloadString);
    }
}
