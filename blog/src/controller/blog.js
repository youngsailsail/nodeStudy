const { exec } = require("../db/sql");
const getList = (author, keyword) => {
    let sql = `select * from blogs  where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc`;
    return exec(sql);
};
const getDetail = id => {
    let sql = `select * from blogs where id = '${id}'`;
    return exec(sql);
};
const newBlog = ({ title, content, author }) => {
    let createtime = Date.now();
    let sql = `insert into blogs(title,content,author,createtime) values('${title}','${content}','${author}',${createtime})`;
    return exec(sql).then(newData => {
        return {
            id: newData.insertId
        };
    });
};
const updateBlog = (id, author, { title, content }) => {
    let sql = `update blogs set `;
    if (title) {
        sql += `title='${title}', `;
    }
    if (content) {
        sql += `content='${content}' `;
    }
    sql += `where id='${id}' and author='${author}'`;
    return exec(sql).then(updateData => {
        console.log(updateData, "updateData");
        return !!updateData.affectedRows;
    });
};
const delBlog = (id, author) => {
    let sql = `delete from blogs where id='${id}'and author='${author}'`;
    return exec(sql).then(delData => {
        console.log(delData, "delData");
        return !!delData.affectedRows;
    });
};
module.exports = {
    getDetail,
    getList,
    newBlog,
    updateBlog,
    delBlog
};
