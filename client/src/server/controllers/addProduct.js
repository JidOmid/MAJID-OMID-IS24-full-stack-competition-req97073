const {read, write} = require('../models')

// async function addProduct(req, res) {
//     try {
//         const { productName, productOwnerName, Developers, scrumMasterName, startDate, methodology } = req.body
//         if (productId) {
//             const products = await read()
//             const duplicateId = products.find((eachProduct) => {
//                 return eachProduct.productId === productId

//             })

//             if (duplicateId) {
//                 return res.status(400).send("Bad Request")
//             }
//         }

//     } catch (err) {
//         console.log(err)
//         return res.status(500).send("Internal Server Error")
//     }
// }

// module.exports.addProduct = addProduct


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