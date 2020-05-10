const superagent = require('superagent');
const { formatBookList, formatBookUrl, formatQuery } = require('../utils/format')
async function getBookList({ query }) {
    let url = formatQuery({ query })
    const { isFilter = false, isSearch = false, n } = query
    try {
        const { text } = await superagent.get(url)
        let data = formatBookList(text)
        return { ...data, bookName: n, time: Date.now(), isSearch, isFilter }
    } catch (error) {
        console.log(error);
    }
}
async function getBookUrl({ query }) {
    let url = formatQuery({ query, type: 2 })
    try {
        const { text } = await superagent.get(url)
        let data = formatBookUrl(text)
        return { ...data }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getBookList, getBookUrl }