const {read} = require("../models");

async function getData(req, res) {
  try {
    const rawData = await read();

    return res.status(200).send(JSON.stringify(rawData));
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
}

module.exports.getData = getData