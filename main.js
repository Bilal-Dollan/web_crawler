const {crawlPage} = require('./crawl.js')

async function main(){
    if (process.argv.length < 3){
        console.log('Enter a Url')
        process.exit(1)
    } 
    if (process.argv.length > 3){
        console.log('Enter one Url')
        process.exit(1)
    }
    try{
        const baseUrl = new URL(process.argv[2])
        const pages = await crawlPage(baseUrl, baseUrl, {})
        for (const page of Object.entries(pages)){
            console.log(page)
        }
    } catch (err){
        console.log('Enter a valid URL')
    }
    
    
}

main()