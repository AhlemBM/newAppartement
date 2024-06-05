import 'dotenv/config';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import './utils/response/customSuccess';
import { APP_PORT, APP_PREFIX_PATH, IS_TEST } from './core/config';
import logger from './core/logger';
import { morganErrorHandler, morganSuccessHandler } from './core/morgan';
import { errorHandler } from './middleware/errorHandler';
import { getLanguage } from './middleware/getLanguage';
import { AppDataSource } from './orm/data-source';
import routes from './routes';

export const app = express();

app.use('/upload', express.static('upload'));
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getLanguage);

// Autoriser les requêtes provenant de http://localhost:4200
app.use(cors({ origin: 'http://localhost:4200' }));
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

try {
  if (!IS_TEST) {
    app.use(morganSuccessHandler);
    app.use(morganErrorHandler);
  }
} catch (err) {
  logger.error(err);
}

app.use(APP_PREFIX_PATH, routes);

app.use(errorHandler);

AppDataSource.initialize().then(async () => {
  logger.info(
    `Database connection success. Connection name: '${AppDataSource.name}' Database: '${AppDataSource.options.database}'`
  );
  app.listen(APP_PORT, () => {
    logger.info(`server listen on port ${APP_PORT}`);
  });
});
