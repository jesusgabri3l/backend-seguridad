import jwt from 'jsonwebtoken';

export const validate = async (req, res, next) => {
    const token = req.header('Auth');
    if (!token) return res.json({error: 'Not token provided'});

    try {
        jwt.verify(token, process.env.SECRET_TOKEN);
        next();
    } catch (err) {
        return res.json({error: 'Not valid token'});
    }
}