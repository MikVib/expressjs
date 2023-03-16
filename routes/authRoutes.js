// routes/authRoutes.js

import express from 'express';
import { loginUser } from '../controllers/authController.js';
import { validateLogin } from '../validators/loginValidator.js'
import { validationErrors } from '../middlewares/validationErrors.js';
import { verifyEmail } from '../controllers/verifyController.js';
import { registerUser } from '../controllers/regController.js'

const router = express.Router();

const validateAuth = validateLogin.filter((_, index) => index !== 0);

router.post('/reg', validateLogin, validationErrors, registerUser);
router.post('/login', validateAuth, validationErrors, loginUser);
router.get('/verify-email/:token', verifyEmail);


export default router;