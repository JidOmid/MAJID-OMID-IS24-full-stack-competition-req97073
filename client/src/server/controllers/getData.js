const {read} = require("../models");

async function getData(req, res) {
  try {
    //calls read model to grab data
    const rawData = await read("db");

    //stringify and return data
    return res.status(200).send(JSON.stringify(rawData));
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports.getData = getData;
