const { normalizeURL, getURLsFromHTML } = require('./crawl.js') 
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocols', () => {
    const input = 'https://test.com/path'
    const actual = normalizeURL(input)
    const expected = 'test.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip last slash', () => {
    const input = 'https://test.com/path/'
    const actual = normalizeURL(input)
    const expected = 'test.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capital letters', () => {
    const input = 'https://TEST.com/path/'
    const actual = normalizeURL(input)
    const expected = 'test.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://test.com/path/'
    const actual = normalizeURL(input)
    const expected = 'test.com/path'
    expect(actual).toEqual(expected)
})
//------------------getURLsFromHTML tests--------------------------
test('getURLsFromHTML', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href='https://example.com/path/'>Example web page</a>
    </body>
</html>
    `
    const inputBaseUrl = 'https://example.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['https://example.com/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href='/path/'>Example web page</a>
    </body>
</html>
    `
    const inputBaseUrl = 'https://example.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['https://example.com/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both absolute and relative URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href='/relativepath/'>Relative Path</a>
        <a href='https://example.com/absolutepath/'>Absoltue Path</a>

    </body>
</html>
    `
    const inputBaseUrl = 'https://example.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['https://example.com/relativepath/', 'https://example.com/absolutepath/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href='invalid url'>Invalid URL</a>
    </body>
</html>
    `
    const inputBaseUrl = 'https://example.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})