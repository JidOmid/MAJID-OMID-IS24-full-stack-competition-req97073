const {read, write} = require("../models");
const {validateProduct} = require("./utils");

//editProduct takes request from the form on frontend, validates and then replaces the product at specified index.
async function editProduct(req, res) {
  try {
    //Validate request using validateProduct util function. true flag to check for productId
    const editedProduct = req.body;
    const validation = validateProduct(editedProduct, true);
    //validateProduct returns empty array if it checks out. otherwise it returns which fields were invalid
    if (validation.length) {
      return res
        .status(400)
        .send({message: "Incorrect Field(s)", fields: validation});
    }
    //Grab list of products and instantiate an index
    const products = await read();
    let productsIndex;
    //Loop through list of productIds in database to see if the edited form matches an existing product.
    //If it does match, return the index of the matched product.
    products.forEach((product, index) => {
      if (product.productId === editedProduct.productId) {
        productsIndex = index;
      }
    });
    //If there is no match, forEach returns undefined.
    if (productsIndex === undefined) {
      return res
        .status(400)
        .send({message: "Incorrect Field(s)", fields: ["productId"]});
    }
    //Map the product so no additional fields can be passed through.
    const editedProductMap = {
      productId: editedProduct.productId,
      productName: editedProduct.productName,
      productOwnerName: editedProduct.productOwnerName,
      Developers: editedProduct.Developers,
      scrumMasterName: editedProduct.scrumMasterName,
      startDate: editedProduct.startDate,
      methodology: editedProduct.methodology,
    };

    //At the index found, replace with new edited product and write to db.
    products[productsIndex] = editedProductMap;
    await write(products);
    //return edited product
    return res.status(200).send(editedProductMap);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.editProduct = editProduct;
