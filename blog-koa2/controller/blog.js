const { exec } = require("../db/sql");
const getList = async (author, keyword) => {
    let sql = `select * from blogs  where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc`;
    return await exec(sql);
};
const getDetail = async id => {
    let sql = `select * from blogs where id = '${id}'`;
    return await exec(sql);
};
const newBlog = async ({ title, content, author }) => {
    let createtime = Date.now();
    let sql = `insert into blogs(title,content,author,createtime) values('${title}','${content}','${author}',${createtime})`;
    let newData = await exec(sql);
    return {
        id: newData.insertId
    };
};
const updateBlog = async (id, author, body) => {
    const { title, content } = body;
    let sql = `update blogs set `;
    if (title) {
        sql += `title='${title}', `;
    }
    if (content) {
        sql += `content='${content}' `;
    }
    sql += `where id='${id}' and author='${author}'`;
    let updateData = await exec(sql);
    return !!updateData.affectedRows;
};
const delBlog = async (id, author) => {
    let sql = `delete from blogs where id='${id}'and author='${author}'`;
    let delData = await exec(sql);
    return !!delData.affectedRows;
};
module.exports = {
    getDetail,
    getList,
    newBlog,
    updateBlog,
    delBlog
};
