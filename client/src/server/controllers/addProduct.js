const {read, write} = require("../models");
const {validateProduct} = require("./utils");
const {v4: uuidv4} = require("uuid");

async function addProduct(req, res) {
  try {
    const newProduct = req.body;
    const validation = validateProduct(newProduct);
    if (validation.length) {
      return res
        .status(400)
        .send({message: "Incorrect Field(s)", fields: validation});
    }
    const products = await read();
    const idList = products.map(({productId}) => productId);
    let newId;
    while (!newId) {
      const productId = uuidv4();
      if (!idList.includes(productId)) {
        newId = productId;
      }
    }
    const newProductMap = {
      productId: newId,
      productName: newProduct.productName,
      productOwnerName: newProduct.productOwnerName,
      Developers: newProduct.Developers,
      scrumMasterName: newProduct.scrumMasterName,
      startDate: newProduct.startDate,
      methodology: newProduct.methodology,
    };
    products.push(newProductMap);
    await write(products);
    return res.status(200).send(newProductMap);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports.addProduct = addProduct;

// {
//     "productId": "d1e2e236-2205-443b-94b8-904aa9fa649a",
//     "productName": "optimize",
//     "productOwnerName": "Jaylon Mraz",
//     "Developers": [
//       "Gene Abbott",
//       "Marcelle McGlynn",
//       "Bertram Bauch",
//       "Joaquin Bergnaum",
//       "Beth Botsford"
//     ],
//     "scrumMasterName": "Michelle Mohr",
//     "startDate": "2003/08/15",
//     "methodology": "Agile"
//   }
