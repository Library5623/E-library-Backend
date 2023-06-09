// All routes will access the app through this file
const testRoutes = require("./testRoutes");
const adminRoutes = require("./adminRoutes");
const studentRoutes = require("./studentRoutes");

const routes = (app) => {
    testRoutes(app)
    adminRoutes(app)
    studentRoutes(app)
}

module.exports = routes