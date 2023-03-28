function validateProducts(product) {
  const badValues = [];
  const {
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology
  } = product;


  if (!productName || typeof productName !== "string")
    badValues.push("productName");
  if (!productOwnerName || typeof productOwnerName !== "string")
    badValues.push("productOwnerName");
  if (!scrumMasterName || typeof scrumMasterName !== "string")
    badValues.push("scrumMasterName");
  if (!methodology || !["Agile", "Waterfall"].includes(methodology))
    badValues.push("methodology");
  if (!Array.isArray(Developers)) badValues.push("Developers");
  if (!Developers.length) badValues.push("Developers");
  if (isNaN(Date.parse(startDate))) badValues.push("startDate");
  Developers.forEach((dev) => {
    if (!dev || typeof dev !== "string") badValues.push("Developers");
  });


  return badValues;
}