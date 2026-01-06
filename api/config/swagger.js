// api/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SDE Roadmap API',
            version: '1.0.0',
            description: 'API documentation for SDE Roadmap platform - A comprehensive guide for aspiring Software Development Engineers',
            contact: {
                name: 'Manojkumar C',
                url: 'https://github.com/Manoj-kumar-C/SDE-RoadMap-',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: 'https://sde-roadmap-api.vercel.app',
                description: 'Production server',
            },
        ],
        tags: [
            { name: 'Roadmaps', description: 'Career roadmap endpoints' },
            { name: 'Videos', description: 'Video resources endpoints' },
            { name: 'Questions', description: 'Interview questions endpoints' },
            { name: 'Notes', description: 'Study notes endpoints' },
            { name: 'Health', description: 'API health check' },
        ],
    },
    apis: ['./main.js', './api/routes/*.js'], // Files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
