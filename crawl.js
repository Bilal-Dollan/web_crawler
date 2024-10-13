const {JSDOM} = require('jsdom');

function normalizeURL (urlString){
    const urlObj = new URL(urlString)
    const urlPath = `${urlObj.hostname}${urlObj.pathname}`
    if (urlPath.length > 0 && urlPath.slice(-1) === '/'){
        return urlPath.slice(0, -1)
    }
    return urlPath

}

function readUrlFromHtml(html, baseUrl){
    let linkList = []
    const dom = new JSDOM(html)
    let link = dom.window.document.querySelectorAll('a')
    for (const a of link){
        if (a.href.slice(0, 1) === "/"){
            try{
                const urlObject = new URL(`${baseUrl}${a.href}`)
                linkList.push(urlObject.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            try{
                const urlObject = new URL(a.href)
                linkList.push(urlObject.href)
            } catch(err){
                console.log(`error with absloute url: ${err.message}`)
            }
        }
    }
    return linkList
}


module.exports = {
    normalizeURL,
    readUrlFromHtml
}