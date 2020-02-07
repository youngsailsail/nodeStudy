const { User, Blog } = require("./model");

!(async () => {
    const BlogData = await Blog.findAndCountAll({
        attributes: ["title", "content"], //只查数组里面的列
        order: [["id", "desc"]], //按照什么排序
        offest: "2", //分页,跳过2个,从第三个开始显示
        limit: "2", //只返回2个
        where: {
            title: "标题1"
        }, //判断条件,
        include: [
            //连表查询
            {
                model: User //下面的条件和上面的一样,除了分页的两个属性
            }
        ]
    });
    const res = BlogData.rows.map(row => {
        const blogdata = row.dataValues;
        blogdata.user = blogdata.user.dataValues;
        return blogdata;
    });
    console.log(res);
    const userData = await User.findAndCountAll({
        order: [["id", "desc"]], //按照什么排序
        include: [
            {
                model: Blog //下面的条件和上面的一样,除了分页的两个属性
            }
        ]
    });
    console.log(userData);
    // console.log(BlogData.count);
    const res = userData.rows.map(row => {
        const data = row.dataValues;
        console.log(data.blog, "data.blog");

        data.blogs = data.blogs.map(item => {
            return item.dataValues;
        });
        return data;
    });
    console.log(res, JSON.stringify(res));
})();
