require("dotenv").config();

// Firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (process.env.NODE_ENV == "production") {
    admin.initializeApp();
} else {
    admin.initializeApp({
        credential: admin.credential.cert(require("./service-account.json")),
    });
}

const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://172.22.227.102:3000", // WSL
            "https://plantwatcher-api.web.app",
            "https://plantwatcher-api.firebaseapp.com",
            "https://pw.h-it.tirol",
        ],
        methods: ["GET", "POST"],
    }),
);
app.use(bearerToken()); // Gives access to req.token if a bearer token is present in the authorization header.
app.use(express.json());
app.use(cookieParser());
app.use(logger("combined"));

// Routes
app.use("/api/v1", require("./routes"));
app.use((err, req, res, next) => {
    if (err.statusCode && err.message) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({
            message: "Ooops, that should not have happened!",
        });
    }
    console.error(err.stack);
});

exports.server = functions.https.onRequest(app);
