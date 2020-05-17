const superagent = require('superagent');
const { formatBookList, formatBookUrl, formatQuery } = require('../utils/format')
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
const { RECOMEND } = require('../conf/constant')
async function getBookList({ query }) {
    const { isFilter = 'false', isSearch = 'false', n } = query
    delete query.isFilter;
    delete query.isSearch
    let url = formatQuery({ query })
    try {
        const { text } = await superagent.get(url)
        let data = formatBookList(text)
        return {
            bookName: n,
            time: Date.now(), isSearch: JSON.parse(isSearch),
            isFilter: JSON.parse(isFilter), ...data,
        }
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
async function getRecommend() {
    let index = getRandomInt(RECOMEND.length)
    return RECOMEND[index]
}
module.exports = { getBookList, getBookUrl, getRecommend }