const {crawlPage} = require('./crawl.js')

function main(){
    if (process.argv.length < 3){
        console.log('Enter a valid Url')
        process.exit(1)
    } 
    if (process.argv.length > 3){
        console.log('Enter one Url')
        process.exit(1)
    }
    try{
        const urlObj = new URL(process.argv[2])
        const baseUrl = urlObj.href
        crawlPage(baseUrl)
    } catch (err){
        console.log('Enter a valid URL')
    }
    
    
}

main()