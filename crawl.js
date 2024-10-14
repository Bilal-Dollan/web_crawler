const {JSDOM} = require('jsdom');


async function crawlPage (baseUrl, currentUrl, pages){
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)
    if (baseUrlObj.hostname != currentUrlObj.hostname){
        return pages
    }

    const normalizedUrl = normalizeURL(currentUrl)

    if (pages[normalizedUrl] > 0){
        pages[normalizedUrl] ++
        return pages
    }
    pages[normalizedUrl] = 1

    try{
        const resp = await fetch(currentUrl)
        const contenttype = resp.headers.get('content-type')
        if (resp.status > 399){
            console.log(`error at page ${currentUrl}, status code: ${resp.status}`)
            return pages
        }
        if (!contenttype.includes('text/html')){
            console.log(`page is not an html at page ${currentUrl}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextUrls =  readUrlFromHtml(htmlBody, baseUrl) 

        for (const nextUrl of nextUrls){
            pages = await crawlPage(baseUrl, nextUrl, pages)
        }
    } catch(err){
        console.log(`bad url at page ${currentUrl}`)
        return pages
    }
    console.log(`Crwaling at page ${currentUrl}`)
    return pages
    
}

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
    readUrlFromHtml,
    crawlPage
}

