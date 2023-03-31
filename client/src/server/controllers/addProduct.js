const {read, write} = require("../models");
const {validateProduct} = require("./utils");
const {v4: uuidv4} = require("uuid");

//addProduct takes request from the form on frontend, validates the data and generates a unique uuid before adding to db.
async function addProduct(req, res) {
  try {
    //validate request with validateProduct util function.
    const newProduct = req.body;
    const validation = validateProduct(newProduct);
    //validateProduct returns empty array if it checks out. otherwise it returns which fields were invalid
    if (validation.length) {
      return res
        .status(400)
        .send({message: "Incorrect Field(s)", fields: validation});
    }
    newProduct.startDate = new Date(newProduct.startDate)
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");
    //grab products and create list of existing Ids
    const products = await read("db");
    const idList = products.map(({productId}) => productId);
    //Instantiate newId. generate new productId and if it already exists in the db regenerate it. While it is near impossible for the generated Id to match an existing id, this loop ensures it is unique.
    let newId;
    while (!newId) {
      const productId = uuidv4();
      if (!idList.includes(productId)) {
        newId = productId;
      }
    }
    //Map the product so no additional fields are passed through.
    const newProductMap = {
      productId: newId,
      productName: newProduct.productName,
      productOwnerName: newProduct.productOwnerName,
      Developers: newProduct.Developers,
      scrumMasterName: newProduct.scrumMasterName,
      startDate: newProduct.startDate,
      methodology: newProduct.methodology,
    };

    //push the new product to list of products and write it to db.
    products.push(newProductMap);
    await write(products);
    //return new product
    return res.status(200).send(newProductMap);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports.addProduct = addProduct;

//example schema for testing.
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
