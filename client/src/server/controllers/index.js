//bundle controllers
module.exports = {
  ...require("./health"),
  ...require("./getData"),
  ...require("./addProduct"),
  ...require("./editProduct"),
  ...require("./apiDocs"),
};
