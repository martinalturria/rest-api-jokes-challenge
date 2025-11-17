import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Jokes Challenge',
      version: '1.0.0',
      description: 'REST API for managing jokes and mathematical operations with standardized responses',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoint',
      },
      {
        name: 'Math',
        description: 'Mathematical operations',
      },
      {
        name: 'Jokes',
        description: 'Joke management and external API integration',
      },
    ],
    components: {
      schemas: {
        ApiSuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-11-17T14:56:20.212Z',
            },
          },
        },
        ApiErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Validation error',
                },
                errorCode: {
                  type: 'string',
                  example: 'VALIDATION_ERROR',
                },
                statusCode: {
                  type: 'number',
                  example: 400,
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-11-17T14:56:20.212Z',
            },
          },
        },
      },
    },
    paths: {
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'Check API health status',
          responses: {
            '200': {
              description: 'API is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        example: 'ok',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/matematico/mcm': {
        get: {
          tags: ['Math'],
          summary: 'Calculate Least Common Multiple (LCM)',
          parameters: [
            {
              name: 'numbers',
              in: 'query',
              required: true,
              description: 'Comma-separated list of positive integers',
              schema: {
                type: 'string',
                example: '12,18,24',
              },
            },
          ],
          responses: {
            '200': {
              description: 'LCM calculated successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              numbers: {
                                type: 'array',
                                items: { type: 'number' },
                                example: [12, 18, 24],
                              },
                              lcm: {
                                type: 'number',
                                example: 72,
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ApiErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/matematico/increment': {
        get: {
          tags: ['Math'],
          summary: 'Increment a number by 1',
          parameters: [
            {
              name: 'number',
              in: 'query',
              required: true,
              description: 'Number to increment',
              schema: {
                type: 'integer',
                example: 5,
              },
            },
          ],
          responses: {
            '200': {
              description: 'Number incremented successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              original: {
                                type: 'number',
                                example: 5,
                              },
                              result: {
                                type: 'number',
                                example: 6,
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/chistes': {
        get: {
          tags: ['Jokes'],
          summary: 'Get a random joke from database',
          responses: {
            '200': {
              description: 'Random joke retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              joke: {
                                type: 'string',
                                example: 'Why did the chicken cross the road?',
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Jokes'],
          summary: 'Create a new joke',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['text', 'userId', 'categoryId'],
                  properties: {
                    text: {
                      type: 'string',
                      example: 'Why did the programmer quit his job?',
                    },
                    userId: {
                      type: 'number',
                      example: 1,
                    },
                    categoryId: {
                      type: 'number',
                      example: 1,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Joke created successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              id: { type: 'number', example: 37 },
                              text: { type: 'string' },
                              userId: { type: 'number' },
                              categoryId: { type: 'number' },
                              createdAt: { type: 'string', format: 'date-time' },
                              updatedAt: { type: 'string', format: 'date-time' },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ApiErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/chistes/{type}': {
        get: {
          tags: ['Jokes'],
          summary: 'Get a joke from external API',
          parameters: [
            {
              name: 'type',
              in: 'path',
              required: true,
              description: 'Type of joke (Chuck or Dad)',
              schema: {
                type: 'string',
                enum: ['Chuck', 'Dad'],
              },
            },
          ],
          responses: {
            '200': {
              description: 'Joke retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              joke: {
                                type: 'string',
                                example: 'Chuck Norris can divide by zero.',
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            '400': {
              description: 'Invalid joke type',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ApiErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/chistes/emparejados': {
        get: {
          tags: ['Jokes'],
          summary: 'Get paired jokes (5 Chuck Norris + 5 Dad jokes)',
          responses: {
            '200': {
              description: 'Paired jokes retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                chuck: { type: 'string' },
                                dad: { type: 'string' },
                                combinado: { type: 'string' },
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/chistes/{number}': {
        put: {
          tags: ['Jokes'],
          summary: 'Update a joke by ID',
          parameters: [
            {
              name: 'number',
              in: 'path',
              required: true,
              description: 'Joke ID',
              schema: {
                type: 'integer',
                example: 1,
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['text'],
                  properties: {
                    text: {
                      type: 'string',
                      example: 'Updated joke text',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Joke updated successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              id: { type: 'number' },
                              text: { type: 'string' },
                              userId: { type: 'number' },
                              categoryId: { type: 'number' },
                              createdAt: { type: 'string', format: 'date-time' },
                              updatedAt: { type: 'string', format: 'date-time' },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            '404': {
              description: 'Joke not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ApiErrorResponse' },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Jokes'],
          summary: 'Delete a joke by ID',
          parameters: [
            {
              name: 'number',
              in: 'path',
              required: true,
              description: 'Joke ID',
              schema: {
                type: 'integer',
                example: 1,
              },
            },
          ],
          responses: {
            '200': {
              description: 'Joke deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/ApiSuccessResponse' },
                      {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              message: {
                                type: 'string',
                                example: 'Joke deleted successfully',
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            '404': {
              description: 'Joke not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ApiErrorResponse' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
