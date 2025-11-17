import 'dotenv/config';
import express, { Application } from 'express';
import mathRoutes from './routes/mathRoutes';
import jokeRoutes from './routes/jokeRoutes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import logger from './config/logger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/matematico', mathRoutes);
app.use('/chistes', jokeRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
