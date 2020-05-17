const superagent = require('superagent');
const { formatBookList, formatBookUrl, formatQuery } = require('../utils/format')
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
function getRecommend() {

}
module.exports = { getBookList, getBookUrl, getRecommend }