const {read, write} = require("../models");
const {validateProduct} = require("./utils");

async function editProduct(req, res) {
  try {
    const editedProduct = req.body;
    const validation = validateProduct(editedProduct, true);
    if (validation.length) {
      return res
        .status(400)
        .send({message: "Incorrect Field(s)", fields: validation});
    }
    const products = await read();
    let productsIndex;
    products.forEach((product, index) => {
      if (product.productId === editedProduct.productId) {
        productsIndex = index;
      }
    });
    console.log(productsIndex, "__test");
    if (productsIndex === undefined) {
      return res
        .status(400)
        .send({message: "Incorrect Field(s)", fields: ["productId"]});
    }
    const editedProductMap = {
      productId: editedProduct.productId,
      productName: editedProduct.productName,
      productOwnerName: editedProduct.productOwnerName,
      Developers: editedProduct.Developers,
      scrumMasterName: editedProduct.scrumMasterName,
      startDate: editedProduct.startDate,
      methodology: editedProduct.methodology,
    };

    products[productsIndex] = editedProductMap;
    await write(products);
    return res.status(200).send(editedProductMap);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.editProduct = editProduct;
