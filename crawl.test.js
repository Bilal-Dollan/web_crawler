const {normalizeURL, readUrlFromHtml} = require('./crawl.js')
const {expect, test} = require('@jest/globals')

test('normalizeURL get hostname and path only', ()=>{
    input = 'https://google.com/search'
    actual = normalizeURL(input)
    expected = 'google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeURL remove trailing slash', ()=>{
    input = 'https://google.com/search/'
    actual = normalizeURL(input)
    expected = 'google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeURL case insansitave check', ()=>{
    input = 'https://GOOGLE.com/search'
    actual = normalizeURL(input)
    expected = 'google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeURL remove http', ()=>{
    input = 'http://google.com/search'
    actual = normalizeURL(input)
    expected = 'google.com/search'
    expect(actual).toEqual(expected)
})


test('readFromHtml', ()=>{
    input1 = 
    `
    <html>
        <body>
            <a href="/path/">hello world</a>
            <a href="https://google.com2">hello world2</a>
        </body>
    </html>
    `
    input2 = 'https://google.com'
    actual = readUrlFromHtml(input1, input2)
    expected = ["https://google.com/path/", "https://google.com2/"]
    expect(actual).toEqual(expected)
})