const controllers = require("../controllers");
//Route to controllers
module.exports = (server) => {
  server.route("/health").get(controllers.health);
  server.route("/get-data").get(controllers.getData)
  server.route("/add-product").post(controllers.addProduct)
};
