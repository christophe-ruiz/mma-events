const jwt = require('jsonwebtoken');
const {User} = require("../resources/user/user.model");

/**
 * auth middleware
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {Promise<void>}
 * @throws {Error}
 * @example
 * const token = req.headers.authorization.split('Bearer ')[1]
 * const decoded = await verifyToken(token)
 * const user = await User.findById(decoded.id)
 * req.user = user
 * next()
 */


exports.newToken = (user) => {
    return jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });

exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }

    try {
        const user = await User.create(req.body);
        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (e) {
        return res.status(500).end();
    }
};

exports.signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }

    const invalid = { message: 'Invalid email and passoword combination' };

    try {
        const user = await User.findOne({ email: req.body.email })
            .select('email password')
            .exec();

        if (!user) {
            return res.status(401).send(invalid);
        }

        const match = await user.checkPassword(req.body.password);

        if (!match) {
            return res.status(401).send(invalid);
        }

        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};

exports.protect = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end();
    }

    const token = bearer.split('Bearer ')[1].trim();
    let payload;
    try {
        payload = await this.verifyToken(token);
    } catch (e) {
        return res.status(401).end();
    }

    const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec();

    if (!user) {
        return res.status(401).end();
    }

    req.user = user;
    next();
};

