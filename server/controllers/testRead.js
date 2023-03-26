const {read} = require("../models");

async function testRead(req, res) {
  try {
    const rawData = await read();

    return res.status(200).send(JSON.stringify(rawData));
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
}

module.exports.testRead = testRead;
