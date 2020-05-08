const superagent = require('superagent');
const { formatQuery } = require('../utils/format')
const { formatBookList } = require('../utils/format')
async function getBookList({ query }) {
    let url = formatQuery({ query })
    console.log(url, 1);
    try {
        const { text } = await superagent.get(url)
        let data = formatBookList(text)
        console.log(data, 1);
        return data
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getBookList }