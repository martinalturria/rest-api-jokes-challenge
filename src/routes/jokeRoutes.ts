import { Router } from 'express';
import { JokeController } from '../controllers/JokeController';
import { JokeService } from '../services/JokeService';
import { JokeRepository } from '../repositories/JokeRepository';
import { ExternalJokeService } from '../services/ExternalJokeService';
import pool from '../config/database';
import { validateCreateJoke, validateUpdateJoke, validateIdParam } from '../middleware/validator';

const router = Router();
const jokeRepository = new JokeRepository(pool);
const externalJokeService = new ExternalJokeService();
const jokeService = new JokeService(jokeRepository, externalJokeService);
const jokeController = new JokeController(jokeService);

router.get('/emparejados', jokeController.getPairedJokes);
router.get('/:type', jokeController.getJokeByType);
router.get('/', jokeController.getRandomJoke);
router.post('/', validateCreateJoke, jokeController.createJoke);
router.put('/:number', validateIdParam, validateUpdateJoke, jokeController.updateJoke);
router.delete('/:number', validateIdParam, jokeController.deleteJoke);

export default router;
