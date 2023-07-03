import STAGE from '../bl/enums/stage.enum';
import WORKER from '../bl/enums/worker.enum';

const CONSTANTS = {
  SERVER: {
    PORT: '8080',
  },
  ENVIRONMENTS: {
    LOCAL: 'local',
    DEVELOPMENT: 'dev',
    QA: 'qa',
    PRODUCTION: 'prod',
  },
  RESTAURANT: {
    STAGES: {
      [STAGE.PENDING]: {
        NAME: STAGE.PENDING,
        PREVIOUS_STAGE: null,
        WORKER_TYPE: null,
        WORKERS_COUNT: -1,
        WORK_ASYNC_COUNT: -1,
        WORK_TIME_SECONDS: -1,
      },
      [STAGE.DOUGH]: {
        NAME: STAGE.DOUGH,
        PREVIOUS_STAGE: STAGE.PENDING,
        WORKER_TYPE: WORKER.DOUGH_CHEF,
        WORKERS_COUNT: 2,
        WORK_ASYNC_COUNT: 1,
        WORK_TIME_SECONDS: 7,
      },
      [STAGE.TOPPING]: {
        NAME: STAGE.TOPPING,
        PREVIOUS_STAGE: STAGE.DOUGH,
        WORKER_TYPE: WORKER.TOPPING_CHEF,
        WORKERS_COUNT: 3,
        WORK_ASYNC_COUNT: 2,
        WORK_TIME_SECONDS: 4,
      },
      [STAGE.OVEN]: {
        NAME: STAGE.OVEN,
        PREVIOUS_STAGE: STAGE.TOPPING,
        WORKER_TYPE: WORKER.OVEN,
        WORKERS_COUNT: 1,
        WORK_ASYNC_COUNT: 1,
        WORK_TIME_SECONDS: 10,
      },
      [STAGE.SERVING]: {
        NAME: STAGE.SERVING,
        PREVIOUS_STAGE: STAGE.OVEN,
        WORKER_TYPE: WORKER.WAITER,
        WORKERS_COUNT: 2,
        WORK_ASYNC_COUNT: 1,
        WORK_TIME_SECONDS: 5,
      },
      [STAGE.DONE]: {
        NAME: STAGE.DONE,
        PREVIOUS_STAGE: STAGE.SERVING,
        WORKER_TYPE: null,
        WORKERS_COUNT: -1,
        WORK_ASYNC_COUNT: -1,
        WORK_TIME_SECONDS: -1,
      },
      [STAGE.ERROR]: {
        NAME: STAGE.ERROR,
        PREVIOUS_STAGE: null,
        WORKER_TYPE: null,
        WORKERS_COUNT: -1,
        WORK_ASYNC_COUNT: -1,
        WORK_TIME_SECONDS: -1,
      },
    },
  },
  DATA: {
    MONGODB: {
      CONNECTION_URL: 'mongodb://127.0.0.1:27017/pizza-restaurant',
    },
  },
  AUTH: {
    HTTP_HEADERS: {
      AUTHORIZATION: 'Authorization',
    },
  },
  EVENTS: {
    SERVER_UP: 'server-up',
  },
  NOT_FOUND: 'Not Found',
};

export default CONSTANTS;
