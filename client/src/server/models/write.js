import fs from 'fs'
import path from 'path'

async function write(data) {
    try {
        if (Array.isArray(data)) {
            const jsonData = JSON.stringify(data)
            const insert = await new Promise(async (resolve, reject) => {
                await fs.writeFile(path.resolve(__dirname, "../db/blob.json"), jsonData, (err) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(jsonData)
                })
            })
            return insert
        }
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports.write = write