function normalizeURL (urlString){
    const urlObj = new URL(urlString)
    const urlPath = `${urlObj.hostname}${urlObj.pathname}`
    if (urlPath.length > 0 && urlPath.slice(-1) === '/'){
        return urlPath.slice(0, -1)
    }
    return urlPath

}

module.exports = {
    normalizeURL
}