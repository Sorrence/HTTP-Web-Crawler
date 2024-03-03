function sortPages(pages){
    try{
        const pagesArr = Object.entries(pages)
        pagesArr.sort((a,b) => {
            aCount = a[1]
            bCount = b[1]
            return b[1] - a[1]
        })
        return pagesArr
    }catch(err){
        return pages
    }
}

function printReport(pages){
    const sortedPages = sortPages(pages)
    console.log("================================Report=================================")
    for(const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log('Found ' + hits + ' links to page: '+ url)
    }
    console.log("==============================End Report===============================")
}

module.exports = {
    sortPages,
    printReport
}