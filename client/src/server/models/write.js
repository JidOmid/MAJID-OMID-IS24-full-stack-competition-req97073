const fs = require("fs");
const path = require("path");

async function write(data) {
  //error catching
  try {
    //Only accept data as array else return null
    if (Array.isArray(data)) {
      //stringify data and write to file. resolve new data.
      const jsonData = JSON.stringify(data);
      const insert = await new Promise(async (resolve, reject) => {
        await fs.writeFile(
          path.resolve(__dirname, "../db/db.json"),
          jsonData,
          (err) => {
            if (err) {
              reject(err);
            }
            resolve(jsonData);
          }
        );
      });
      return insert;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.write = write;
