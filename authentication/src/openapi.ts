//https://github.com/satansdeer/swagger-api-library/blob/master/routes/books.js

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Analysis service',
    version: '1.0.0',
    description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [__dirname + '/routes/**/*.{js,ts}']
};


export default options;

