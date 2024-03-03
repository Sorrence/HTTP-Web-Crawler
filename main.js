const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    //Arguments check
    if(process.argv.length < 3){
        console.log("No website provided")
        process.exit(1)
    }
    else if(process.argv.length > 3){
        console.log("Too many argument provided")
        process.exit(1)
    }
    
    const baseURL = process.argv[2]
    const pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages)
    
}

main()