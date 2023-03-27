const fs = require("fs");
const path = require("path");

async function read() {
  try {
    const data = await new Promise(async (resolve, reject) => {
      await fs.readFile(path.resolve(__dirname, "../db/db.json"), (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
    return data;
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports.read = read;
