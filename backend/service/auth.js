const JWT = require("jsonwebtoken");
const SECRET_KEY_JWT = "Tushky30@";

function createTokenForUser(user){
    const payload = {
        name: user.name,
        email:user.email,
    }
    return JWT.sign(payload,SECRET_KEY_JWT);
}

function verifyToken(token){
    const payload = JWT.verify(token,SECRET_KEY_JWT);
}

module.exports = {
    createTokenForUser,
    verifyToken,
}