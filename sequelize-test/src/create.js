const { User, Blog } = require("./model");

!(async () => {
    const zhangsan = await User.create({
        userName: "zhangsan",
        password: "123",
        nickName: "张三"
    });
    const blog1 = await Blog.create({
        title: "标题2",
        content: "内容2",
        userId: 2
    });
    console.log(blog1.dataValues);
})();
