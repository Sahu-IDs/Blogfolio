import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log("Authentication Failed: Token is missing");
        return response.status(401).json({ msg: 'token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            console.log("Authentication Failed: Invalid Token", error.message);
            return response.status(403).json({ msg: 'invalid token' })
        }

        request.user = user;
        next();
    })
}
