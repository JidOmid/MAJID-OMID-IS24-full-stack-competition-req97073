const fs = require("fs");
const path = require("path");

async function read(file) {
  //error catching
  try {
    //Read db.json and resolve parsed data
    const data = await new Promise(async (resolve, reject) => {
      await fs.readFile(
        path.resolve(__dirname, `../db/${file}.json`),
        (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(data));
        }
      );
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports.read = read;
