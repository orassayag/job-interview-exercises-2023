import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import ENV from '../config/env';
import CONSTANTS from './config/constants.config';
import IndexPublicRoutes from './routes/index.public.routes';
import ExpressHelper from './helpers/express.helper';
import ErrorsMiddleware from './middlewares/errors.middleware';
import LogMiddleware from './middlewares/logs.middleware';
import LoggerService from './services/logger.service';
import SwaggerService from './services/swagger.service';
import MongoDBService from './services/mongodb.service';
import SnowflakeService from './services/snowflake.service';

// Set the server.
const app = express();
// Get the server's port.
const port = ExpressHelper.validatePort(ENV.server.port || CONSTANTS.SERVER.PORT);
const url = `http://localhost:${port}`;
// For error handling, we need to externalise this.
process.env.NODE_ENV = ENV.server.env;
// Set the cookies and the cors.
app.use(
  cors({
    origin: '*',
  })
);
app.use(cookieParser());
// Set the Swagger UI by the OpenApi.
const { swaggerUi, swaggerSetup } = SwaggerService.initiate(url);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup, { explorer: true }));
// Set the express limitations.
app.use(express.json({ limit: CONSTANTS.SERVER.EXPRESS_LIMIT }));
app.use(express.urlencoded({ limit: CONSTANTS.SERVER.EXPRESS_LIMIT, extended: false }));
// Set the compression middleware.
app.use(compression());
// Set logging for each request.
app.use('/', LogMiddleware.log);
// Set the public paths that do not require any authentication.
app.use('/api', IndexPublicRoutes.initiate());
// Set page not found handling.
app.use(ErrorsMiddleware.PageNotFoundHandlerMiddleware);
// Set the errors handler.
app.use(ErrorsMiddleware.ErrorHandlerMiddleware);
// Create and start the server.
app.set('port', port);
const server = http.createServer(app);
server.listen(port, async () => {
  LoggerService.info(`Web server initiated successfully: ${url}`);
  // Initiate the MongoDB service.
  await MongoDBService.initiate();
  // Initiate the Snowflake service.
  await SnowflakeService.initiate();
});
server.on('error', ExpressHelper.onError(port));
server.on('listening', ExpressHelper.onListening(server));

export default server;
