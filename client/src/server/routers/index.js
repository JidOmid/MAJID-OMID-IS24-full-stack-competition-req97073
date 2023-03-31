const controllers = require("../controllers");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../db/api-docs.json");
//Route to controllers
module.exports = (server) => {
  server.route("/health").get(controllers.health);
  server.route("/get-data").get(controllers.getData);
  server.route("/add-product").post(controllers.addProduct);
  server.route("/edit-product").put(controllers.editProduct);
  server.use("/api-docs", swaggerUi.serve);
  server.get("/api-docs", swaggerUi.setup(swaggerDocument));
};
