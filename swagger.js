const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: '1.0.0',
    title: 'Metric Tracking System',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: 'Development',
    },
  ],
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      SignUpBody: {
        username: 'toannguyentruong',
        password: 'mypassword',
        firstName: 'Toan',
        lastName: 'Nguyen',
      },
      User: {
        id: '363b091b-791b-4dc6-958e-556979ff4d80',
        username: 'toannguyentruong',
        firstName: 'Toan',
        lastName: 'Nguyen',
        updatedAt: '2024-12-03T15:05:22.624Z',
        createdAt: '2024-12-03T15:05:22.624Z',
      },
      SignInBody: {
        username: 'toannguyentruong',
        password: 'mypassword',
      },
      SignInResponse: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
      RefreshBody: {
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
      RefreshResponse: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
      SuccessResponse: {
        code: 200,
        isSuccess: true,
        data: {},
      },
      AddMetricBody: {
        date: '2025-01-08T13:39:59Z',
        value: 12.3,
        type: 'DISTANCE',
        unit: 'cm',
      },
      Metric: {
        id: '7de918c5-8b2f-4ff1-83a9-78bbe19bb882',
        unit: 'C',
        type: 'TEMPERATURE',
        value: 37.8,
        date: '2025-01-08T13:39:59.000Z',
        userId: '81dec07a-ed27-45df-bc08-68d0d96d4bd3',
        createdAt: '2025-01-17T15:01:36.347Z',
        updatedAt: '2025-01-17T15:01:36.347Z',
      },
      Metrics: [
        {
          id: '7de918c5-8b2f-4ff1-83a9-78bbe19bb882',
          unit: 'C',
          type: 'TEMPERATURE',
          value: 37.8,
          date: '2025-01-08T13:39:59.000Z',
          userId: '81dec07a-ed27-45df-bc08-68d0d96d4bd3',
          createdAt: '2025-01-17T15:01:36.347Z',
          updatedAt: '2025-01-17T15:01:36.347Z',
        },
      ],
      MetricsCharts: [
        {
          value: 310.95,
          unit: 'K',
          type: 'TEMPERATURE',
          date: '2025-01-08T13:39:59.000Z',
        },
      ],
      Unauthorized: {
        code: 401,
        message: 'Unauthorized',
        isSuccess: false,
        data: null,
      },
      Forbidden: {
        code: 403,
        message: 'Could not refresh access token',
        isSuccess: false,
        data: null,
      },
      ErrorResponse: {
        code: 500,
        isSuccess: false,
        message: 'Error message',
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js');
});
