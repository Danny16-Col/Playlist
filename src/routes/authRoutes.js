import express from 'express';
import { login, register } from '../controllers/authControllers.js';

const router = express.Router();

// register and login should be POST endpoints
router.post('/register', register);
router.post('/login', login);

export default router;