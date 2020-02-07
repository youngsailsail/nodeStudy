const sql = require("./seq");
const Sequelize = require("sequelize");

//默认表名+s
const User = sql.define("user", {
    //id自动设置
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: "昵称"
    }
});
const Blog = sql.define("blog", {
    //id自动设置
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
Blog.belongsTo(User, {
    foreignKey: "userId"
});
User.hasMany(Blog, {
    foreignKey: "userId"
});
module.exports = {
    User,
    Blog
};
