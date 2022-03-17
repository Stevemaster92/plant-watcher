const auth = require("firebase-admin").auth();
const bcrypt = require("bcrypt");

function register() {
    return auth.createUser({
        email: process.env.USER_EMAIL,
        emailVerified: true,
        password: process.env.USER_PASSWORD,
        displayName: "PW User",
    });
}

async function login(email, password) {
    const user = await auth.getUserByEmail(email);
    const hashed = bcrypt.hashSync(process.env.USER_PASSWORD, 10);

    const match = await bcrypt.compare(password, hashed);
    if (!match) {
        throw new Error("Invalid password");
    }

    return auth.createCustomToken(user.uid);
}

function verifyToken(token) {
    return auth.verifyIdToken(token, true);
}

module.exports = {
    register,
    login,
    verifyToken,
};
