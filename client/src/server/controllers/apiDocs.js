const {read} = require("../models");

async function apiDocs(req, res) {
  try {
    //calls read model to grab data
    const rawData = await read("api-docs");

    //stringify and return data
    return res.status(200).send(JSON.stringify(rawData));
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports.apiDocs = apiDocs;
