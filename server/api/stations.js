const router = require("express").Router();
const httpError = require("http-errors");
const { Stations, SensorData } = require("../services/firestore");

router
    .get("/", async (req, res, next) => {
        try {
            const stations = await new Stations().getAll();

            if (stations && stations.length > 0) {
                res.json(stations);
            } else {
                next(new httpError.NotFound("No stations found"));
            }
        } catch (err) {
            next(err);
        }
    })
    .post("/", async (req, res, next) => {
        try {
            res.json(await new Stations().put(req.body));
        } catch (err) {
            next(err);
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const station = await new Stations().get(req.params.id);

            if (station) {
                res.json(station);
            } else {
                next(new httpError.NotFound("No station found"));
            }
        } catch (err) {
            next(err);
        }
    })
    .post("/:id", async (req, res, next) => {
        req.body.stationId = Number.parseInt(req.params.id);

        try {
            res.json(await new SensorData().put(req.body));
        } catch (err) {
            next(err);
        }
    })
    .get("/:id/sensors", async (req, res, next) => {
        try {
            const sensorData = await new SensorData().getAllByStation(req.params.id);

            if (sensorData && sensorData.length > 0) {
                res.json(sensorData);
            } else {
                next(new httpError.NotFound("No sensor data found"));
            }
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
