// a pushbutton to send messages
let sendButton;
let localDiv;
let remoteDiv;

// intensity of the circle in the middle
let intensity = 255;
// let mockData =
// '{"messageID": "cac8edf1-a629-444b-a1a6-1e3b9a0f502e", "type": "sanchez_01", "category": "general", "version": "3.7.8", "data": {"identifiers": {"streamId": "test_sanchez", "instanceId": "SANCHEZ", "payloadId": 223, "initiatorId": "4b3f", "sessionId": null}, "value": {}, "specificValue": {"actors": [["1, Gica, RETIRED, 1", "snake", 33, 58, 0, 0, [[33, 58]], 1], ["2, Radu, ADULT, 30", "snake", 76, 29, -1.3609799144609025, -0.3843613825997538, [[60, 38], [62, 38], [63, 37], [65, 36], [66, 34], [67, 34], [69, 35], [70, 36], [72, 37], [73, 37], [75, 36], [76, 35], [77, 34], [79, 33], [80, 34], [82, 36], [83, 37], [84, 37], [86, 36], [87, 34], [89, 33], [87, 32], [86, 30], [85, 29], [84, 28], [83, 28], [81, 29], [79, 30], [78, 30], [76, 29]], 2], ["3, Alex, RETIRED, 1", "snake", 3, 15, 0, 0, [[3, 15]], 3], ["4, Paul, ADULT, 46", "snake", 84, 59, 1.2595907122303933, 0.6429861877699472, [[27, 32], [28, 32], [30, 31], [32, 31], [33, 31], [34, 33], [35, 35], [36, 36], [37, 37], [38, 37], [40, 36], [42, 36], [43, 37], [44, 38], [45, 40], [46, 41], [47, 42], [49, 42], [51, 41], [52, 41], [53, 42], [54, 43], [55, 45], [56, 47], [57, 47], [59, 47], [61, 46], [62, 46], [63, 47], [64, 49], [65, 51], [66, 52], [67, 52], [69, 51], [71, 51], [72, 51], [73, 52], [74, 54], [75, 56], [76, 57], [77, 57], [79, 56], [81, 56], [82, 56], [83, 58], [84, 59]], 4], ["5, Sonic, ADULT", "hedgehog", 6, 1, 1.4057047168155838, -0.15490077185869303, [[6, 1]], 5]], "stones": [[10, 10], [34, 42]], "logic_w": 170, "logic_h": 90, "frame_h": 540, "frame_w": 1020, "colors": [[0, 0, 0], [255, 255, 255], [100, 100, 100], [20, 180, 20], [100, 100, 100], [42, 42, 165], [100, 70, 248]], "gigi": "dummy_payload", "sanchez": true, "tags": "", "collected": false}, "time": "2022-11-03 15:17:35.538035", "img": {"id": null, "height": null, "width": null}}, "metadata": {"sbTotalMessages": 223, "sbCurrentMessage": 223, "captureMetadata": {}, "pluginMetadata": {"ALIVE_TIME_MINS": 0.24, "PLUGIN_REAL_RESOLUTION": 30.92, "PLUGIN_LOOP_RESOLUTION": 40.118271783528925, "ALERT_HELPER": "A=0, N=0, CT=NA, E=A[]=0.00 vs >=0.50 ", "DEMO_MODE": false, "PROCESS_DELAY": 0, "GRAPH_TYPE": "sanchez", "VERSION": "0.1.0.0", "CONFIDENCE_THRESHOLD": 0.3, "LOCATION": [0, 0, 540, 1020]}}, "time": {"deviceTime": "", "hostTime": "2022-11-03 15:17:35.586035", "internetTime": ""}, "sender": {"id": "solis", "instanceId": "solis", "hostId": "StefanBox"}, "demoMode": false, "SB_IMPLEMENTATION": "cavi2"}';
let data = "";

function setup() {
    createCanvas(400, 400);
    // Create an MQTT client:
    createClient();
    // create a div for local messages:
}

function draw() {
    if (data == "") return;

    parsed_data = JSON.parse(data);
    try {
        scene_state = parsed_data.data.specificValue;
        if (
            parsed_data.data.identifiers.instanceId != "SANCHEZ" ||
            !scene_state.sanchez
        ) {
            console.log("The input data is not from SANCHEZ!");
        } else {
            draw_frame(scene_state);
        }
    } catch {}
}

function mouseClicked() {
    console.log(mouseX, mouseY);
}
