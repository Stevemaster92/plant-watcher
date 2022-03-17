const router = require("express").Router();
const httpError = require("http-errors");
const auth = require("../services/auth");

router
    .post("/register", async (req, res, next) => {
        try {
            await auth.register();
            res.sendStatus(201);
        } catch (err) {
            if (err.code === "auth/email-already-exists") {
                next(httpError.Conflict(err.message));
            } else {
                next(httpError.InternalServerError(err.message));
            }
        }
    })
    .post("/login", async (req, res, next) => {
        try {
            const token = await auth.login(req.body.email, req.body.password);
            res.json({ token });
        } catch (err) {
            if (err instanceof Error) {
                next(httpError.BadRequest(err.message));
            } else {
                if (err.code === "auth/user-not-found") {
                    next(httpError.NotFound(err.message));
                } else if (err.code === "auth/invalid-email" || err.code === "auth/invalid-password") {
                    next(httpError.BadRequest(err.message));
                } else {
                    next(httpError.InternalServerError(err.message));
                }
            }
        }
    })
    .post("/logout", (req, res) => {
        res.clearCookie("session");
        res.sendStatus(200);
    })
    .get("/verify", async (req, res, next) => {
        try {
            const decoded = await auth.verifyToken(req.token);
            res.json(decoded.uid);
        } catch (err) {
            if (err.code === "auth/id-token-expired" || err.code === "auth/id-token-revoked") {
                next(httpError.Unauthorized(err.message));
            } else if (err.code === "auth/invalid-id-token" || err.code === "auth/argument-error") {
                next(httpError.BadRequest(err.message));
            } else {
                next(httpError.InternalServerError(err.message));
            }
        }
    });

module.exports = router;
