const station = {
    measureInterval: 60 * 60 * 1000, // ms, default 60 mins
    threshold: {
        wet: 90, // %
        damp: 50, // %
        normal: 30, // %
        dry: 10, // %
    },
    sensorPins: [36],
};

module.exports = {
    station,
};
