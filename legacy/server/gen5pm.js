#!/usr/bin/env node

// generate a fake message from the given sensor
//
// you can use this file for testing like this: 1 is the sensor ID.
// ./generate.js 1 > /dev/udp/0.0.0.0/33333

/*
If you get errors with:

    throw new Error('Implement me. Unknown stream file type!');

Just use:

./generate.js a4 | cat > /dev/udp/0.0.0.0/33333

instead. (notice the `| cat >` part.)
 */

if (process.argv.length < 3) {
    console.error("Not enough arguments.");
    console.error("Usage: ./generate.js [a4|pm|bmp] > /dev/udp/0.0.0.0/33333")
    process.exit(1);
}

var sensorName = "pm"; // only one sensor type...

var sensorDataSchema = {
    "pm": {
        "PM10": "double",
        "PM25_CF1": "double",
        "PM100_CF1": "double",
        "PM10_STD": "double",
        "PM25_STD": "double", // plot
        "PM100_STD": "double",
        "gr03um": "double",
        "gr25um": "double",
        "gr50um": "double",
        "gr10um": "double",
        "gr100um": "double",
        "gt05um": "double"
    }
}

var sensor = sensorDataSchema[sensorName];
if (sensor === undefined) {
    console.error("unknown sensor", sensorName,". Use one of a4, bmp or pm.");
    process.exit(1);
}

var msg = {
    "$timestamp": new Date().toString(),
    "_type": sensorName,
    "_sid": parseInt(process.argv[2])
};
for (var readingName in sensor) {
    msg["$"+readingName] = Math.random() * 50;
}

console.log(JSON.stringify(msg));
