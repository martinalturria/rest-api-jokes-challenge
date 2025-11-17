import { Router } from 'express';
import { MathController } from '../controllers/MathController';
import { MathService } from '../services/MathService';
import { validateNumbers, validateNumber } from '../middleware/validator';

const router = Router();
const mathService = new MathService();
const mathController = new MathController(mathService);

router.get('/mcm', validateNumbers, mathController.calculateLCM);
router.get('/increment', validateNumber, mathController.increment);

export default router;
