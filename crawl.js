const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }
    const normalizedCurrentURL = normalizeURL(currentURL)

    try{
        if(pages[normalizedCurrentURL] > 0){
            pages[normalizedCurrentURL]++
            return pages
        }
    }catch(err){
    return pages
    }
    pages[normalizedCurrentURL] = 1
    console.log('Started crawling on ' + currentURL)
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log('Error in fetch with status code: ' + resp.status + ' on page ' + currentURL)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`Response is not html, content-type: ${contentType}, on page: ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }
        return pages
}

function getURLsFromHTML(HTMLBody, baseURL){
    const urlObj = new URL(baseURL)
    const urls = []
    const dom = new JSDOM(HTMLBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        if(linkElement.href[0] === '/'){
            newUrlObj = new URL(`${urlObj.protocol}//${urlObj.hostname}${linkElement.href}`)
            urls.push(newUrlObj.href)
        }
        else{
            try{
                newUrlObj = new URL(linkElement.href)
                urls.push(newUrlObj.href)

            }
            catch(err){
                if(newUrlObj.href === 'about:blank' || 'about:blank#' || 'about:blank#content'){}
                else{console.log('Error with absolute URL: ' + err.message + ' on this catched link: ' + newUrlObj.href)}
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.endsWith('/')){
        return hostPath.slice(0,-1)
    }
    return hostPath
}
module.exports = {
    normalizeURL, 
    getURLsFromHTML,
    crawlPage
}