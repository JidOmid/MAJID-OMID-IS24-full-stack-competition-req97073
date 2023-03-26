const controllers = require("../controllers");
module.exports = (server) => {
  server.route("/health").get(controllers.health);
  server.route("/test-read").get(controllers.testRead);
};
