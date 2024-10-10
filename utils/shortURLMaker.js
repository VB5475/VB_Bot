const shortid = require("shortid")
const URL = require("../models/url")
async function ShortURLMaker(url) {
    const shortID = shortid()
    const urlObj = {
        shortID: shortID,
        redirectURL: url,
        visitHistory: [],
    }
    console.log("url object ", urlObj)
    await URL.create(urlObj)

    return `http://localhost:8001/${shortID}`

}


module.exports = {
    ShortURLMaker
}