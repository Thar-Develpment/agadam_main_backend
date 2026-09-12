const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";

const endpointsFiles = [
  "./app.js"
];

const doc = {
  info: {
    title: "My API",
    description: "My API Documentation",
    version: "1.0.0"
  },
  host: "localhost:5000",
  schemes: ["http"]
};

swaggerAutogen(outputFile, endpointsFiles, doc);