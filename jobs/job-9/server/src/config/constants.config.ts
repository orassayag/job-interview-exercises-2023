const CONSTANTS = {
  SERVER: {
    PORT: '8080',
    EXPRESS_LIMIT: '5mb',
  },
  ENVIRONMENTS: {
    LOCAL: 'local',
    DEVELOPMENT: 'dev',
    QA: 'qa',
    PRODUCTION: 'prod',
  },
  DATA: {
    MONGODB: {
      CONNECTION_URL: 'mongodb://127.0.0.1:27017/test',
    },
    SNOWFLAKE: {
      ACCESS_URL: 'https://drnfjst-mx91435.snowflakecomputing.com',
      USERNAME: 'orassayag',
      PASSWORD: 'oDMMo!c7DkZI$ViBxesk',
      ACCOUNT: 'MX91435',
      DATABASE: 'SNOWFLAKE_SAMPLE_DATA',
      ROLE: 'ACCOUNTADMIN',
      TABLE: 'TPCDS_SF100TCL',
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
