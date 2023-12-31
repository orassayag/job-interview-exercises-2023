import cors from 'cors';
import express from 'express';
import http from 'http';
import ENV from '../config/env.js';
import CONSTANTS from './config/constants.config.js';
import CustomEventEmitter from './custom/event.emitter.custom.js';
import IndexPublicRoutes from './routes/index.public.routes.js';
import ExpressHelper from './helpers/express.helper.js';
import ErrorsMiddleware from './middlewares/errors.middleware.js';
import LogMiddleware from './middlewares/logs.middleware.js';
import LoggerService from './services/logger.service.js';

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
    credentials: true,
    origin: true,
    exposedHeaders: ['Content-Type', CONSTANTS.AUTH.HTTP_HEADERS.AUTHORIZATION, 'Set-Cookie'],
  }),
);
// Set the express limitations.
app.use(express.json());
// Set logging for each request.
app.use('/', LogMiddleware.log);
// Set the public paths that do not require any authentication.
app.use('/api', IndexPublicRoutes.initiate());
// Set the errors handler.
app.use(ErrorsMiddleware.ErrorHandlerMiddleware);
// Create and start the server.
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  LoggerService.info(`Web server initiated successfully: ${url}`);
  server.emit(CONSTANTS.EVENTS.SERVER_UP);
  CustomEventEmitter.emit(CONSTANTS.EVENTS.SERVER_UP);
});
server.on('error', ExpressHelper.onError(port));
server.on('listening', ExpressHelper.onListening(server));

export default server;
