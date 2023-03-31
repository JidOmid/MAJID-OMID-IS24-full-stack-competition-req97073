//validateProduct takes product and a checkId param. checkId is only used in the case of the editProduct controller.
function validateProduct(product, checkId = false) {
  //instantiate badValues as an empty array and deconstruct the keys from the product.
  const badValues = new Set([]);
  const {
    productId,
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  } = product;

  //check each field to ensure it exists and it is typeof string. If any fields are wrong, push to the badValues array. incorrect fields will be returned
  //only check for Id if required.
  if (checkId && (!productId || typeof productId !== "string"))
    badValues.add("productId");
  if (!productName || typeof productName !== "string")
    badValues.add("productName");
  if (!productOwnerName || typeof productOwnerName !== "string")
    badValues.add("productOwnerName");
  if (!scrumMasterName || typeof scrumMasterName !== "string")
    badValues.add("scrumMasterName");
  //only allow agile and waterfall methodologies
  if (!methodology || !["Agile", "Waterfall"].includes(methodology))
    badValues.add("methodology");
  //check if Developers is an array
  if (!Array.isArray(Developers)) badValues.add("Developers");
  //check if there is atleast 1 developer
  if (!Developers?.length) badValues.add("Developers");
  //check if startDate is a valid date.
  if (isNaN(Date.parse(startDate))) badValues.add("startDate");
  //check each element in Developers is a string.
  Developers?.forEach((dev) => {
    if (!dev || typeof dev !== "string") badValues.add("Developers");
  });

  return [...badValues];
}

module.exports.validateProduct = validateProduct;
