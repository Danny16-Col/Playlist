import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import AppError from "../utils/AppError.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// register
export const register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return next(new AppError('User already exists',400))

        const user = await User.create({ username, email, password });
        res.status(201).json({
            id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};

// login
export const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return next(new AppError('Invalid credentials',401))
        }

        res.json({
            id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};
