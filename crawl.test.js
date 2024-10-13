const {normalizeURL} = require('./crawl.js')
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