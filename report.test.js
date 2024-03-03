const { sortPages } = require('./report.js') 
const { test, expect } = require('@jest/globals')

test('sortPages', () => {
    const input = {
        'wagslane.dev': 30,
        'wagslane.dev/tags': 10,
        'wagslane.dev/about': 21
    }
    const sorted = sortPages(input)
    const expected = [
        ['wagslane.dev', 30],
        ['wagslane.dev/about', 21],
        ['wagslane.dev/tags', 10]
    ]
    expect(sorted).toEqual(expected)
})
