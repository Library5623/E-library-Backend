// All routes will access the app through this file
const testRoutes = require("./testRoutes");

const routes = (app) => {
    testRoutes(app)
}

module.exports = routes